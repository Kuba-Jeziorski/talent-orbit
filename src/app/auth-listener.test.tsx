import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { USER_QUERY_KEY } from "../constants/constants";
import { supabase } from "../libs/supabase/client";
import { AuthListener } from "./auth-listener";

vi.mock("../libs/supabase/client", () => ({
  supabase: {
    auth: {
      onAuthStateChange: vi.fn(),
    },
  },
}));

const onAuthStateChange = vi.mocked(supabase.auth.onAuthStateChange);
const unsubscribe = vi.fn();

let authCallback: (
  event: AuthChangeEvent,
  session: Session | null,
) => void | Promise<void>;

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
};

const renderAuthListener = (queryClient: QueryClient) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <AuthListener>
        <p>app content</p>
      </AuthListener>
    </QueryClientProvider>,
  );
};

describe("auth listener", () => {
  beforeEach(() => {
    unsubscribe.mockReset();
    onAuthStateChange.mockReset();
    onAuthStateChange.mockImplementation((callback) => {
      authCallback = callback;
      return {
        data: { subscription: { unsubscribe } },
      } as never;
    });
  });

  afterEach(() => {
    cleanup();
  });

  it("shows the spinner until the first auth event", () => {
    renderAuthListener(createQueryClient());

    expect(screen.queryByText("app content")).not.toBeInTheDocument();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();
    expect(onAuthStateChange).toHaveBeenCalledTimes(1);
  });

  it("shows children and caches the user after a session event", () => {
    const queryClient = createQueryClient();
    renderAuthListener(queryClient);

    act(() => {
      authCallback("INITIAL_SESSION", {
        user: { id: "1", email: "test@test.com" },
      } as Session);
    });

    expect(screen.getByText("app content")).toBeInTheDocument();
    expect(document.querySelector(".animate-spin")).not.toBeInTheDocument();
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toMatchObject({
      email: "test@test.com",
    });
  });

  it("caches null when the session is missing", () => {
    const queryClient = createQueryClient();
    renderAuthListener(queryClient);

    act(() => {
      authCallback("INITIAL_SESSION", null);
    });

    expect(screen.getByText("app content")).toBeInTheDocument();
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeNull();
  });

  it("updates the cache on later auth events without hiding children", () => {
    const queryClient = createQueryClient();
    renderAuthListener(queryClient);

    act(() => {
      authCallback("INITIAL_SESSION", {
        user: { id: "1", email: "test@test.com" },
      } as Session);
    });

    act(() => {
      authCallback("SIGNED_OUT", null);
    });

    expect(screen.getByText("app content")).toBeInTheDocument();
    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeNull();
  });

  it("unsubscribes when unmounted", () => {
    const { unmount } = renderAuthListener(createQueryClient());

    unmount();

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
