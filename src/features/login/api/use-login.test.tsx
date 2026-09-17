import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useLogin } from "./use-login";
import { login as loginApi } from "./login";
import { ROUTE_HOME, USER_QUERY_KEY } from "../../../constants/constants";

// TODO
// Get back to it
type Props = {
  children: React.ReactNode;
};

const { navigate } = vi.hoisted(() => ({
  navigate: vi.fn(),
}));

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router")>();

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

vi.mock("./login", () => ({
  login: vi.fn(),
}));

const loginApiMock = vi.mocked(loginApi);

const createWrapper = (queryClient: QueryClient) => {
  return ({ children }: Props) => {
    return (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
      </QueryClientProvider>
    );
  };
};

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
};

describe("use login", () => {
  let consoleError: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    loginApiMock.mockReset();
    navigate.mockReset();
    consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleError.mockRestore();
  });

  it("success", async () => {
    const user = { id: "1", email: "test@test.com" };
    loginApiMock.mockResolvedValue({ user } as never);

    const queryClient = createQueryClient();
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(queryClient),
    });

    // mutations must be wrapped in act()
    // userEvents are wrapped in act() behind the scenes
    act(() => {
      // loginApiMock is hit
      // result.current is a latest return of calling useLogin
      result.current.login({ email: "test@test.com", password: "password" });
    });

    await waitFor(() => {
      expect(queryClient.getQueryData(USER_QUERY_KEY)).toMatchObject({
        email: "test@test.com",
      });
    });

    expect(loginApiMock).toHaveBeenCalledWith(
      { email: "test@test.com", password: "password" },
      expect.anything(),
    );
    expect(navigate).toHaveBeenCalledWith(ROUTE_HOME, { replace: true });
    expect(consoleError).not.toHaveBeenCalled();
  });

  it("error", async () => {
    loginApiMock.mockRejectedValue(new Error("incorrect credentials"));

    const queryClient = createQueryClient();
    const { result } = renderHook(() => useLogin(), {
      wrapper: createWrapper(queryClient),
    });

    act(() => {
      result.current.login({ email: "test@test.com", password: "password" });
    });

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalledWith("incorrect credentials");
    });

    expect(queryClient.getQueryData(USER_QUERY_KEY)).toBeUndefined();
    expect(navigate).not.toHaveBeenCalled();
  });
});
