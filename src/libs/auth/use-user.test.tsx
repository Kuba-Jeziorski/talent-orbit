import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { USER_QUERY_KEY } from "../../constants/constants";
import { getSessionUser } from "./get-session-user";
import { useUser } from "./use-user";

type Props = {
  children: React.ReactNode;
};

vi.mock("./get-session-user", () => ({
  getSessionUser: vi.fn(),
}));

const getSessionUserMock = vi.mocked(getSessionUser);

const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: Props) => {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
};

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
};

describe("use user", () => {
  beforeEach(() => {
    getSessionUserMock.mockReset();
  });

  it("reads the user from cache without calling getSessionUser", () => {
    const user = { id: "1", email: "test@test.com" };
    const queryClient = createQueryClient();
    queryClient.setQueryData(USER_QUERY_KEY, user);

    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(queryClient),
    });

    expect(result.current.user).toMatchObject({ email: "test@test.com" });
    expect(result.current.isAuthenticated).toBe(true);
    expect(getSessionUserMock).not.toHaveBeenCalled();
  });

  it("loads the user with getSessionUser when the cache is empty", async () => {
    getSessionUserMock.mockResolvedValue({
      id: "1",
      email: "test@test.com",
    } as never);

    const queryClient = createQueryClient();
    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
    });

    expect(result.current.user).toMatchObject({ email: "test@test.com" });
    expect(getSessionUserMock).toHaveBeenCalled();
  });

  it("is not authenticated when getSessionUser returns null", async () => {
    getSessionUserMock.mockResolvedValue(null);

    const queryClient = createQueryClient();
    const { result } = renderHook(() => useUser(), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => {
      expect(result.current.user).toBeNull();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(getSessionUserMock).toHaveBeenCalled();
  });
});
