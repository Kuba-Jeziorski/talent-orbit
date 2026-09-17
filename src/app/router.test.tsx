import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { act } from "@testing-library/react";
import { RouterProvider } from "react-router";
import "@testing-library/jest-dom/vitest";
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  USER_QUERY_KEY,
} from "../constants/constants";
import { queryClient } from "./query";
import { router } from "./router";

const user = { id: "1", email: "test@test.com" };

const getRouteLoader = (path: string) => {
  const route = router.routes.find((entry) => entry.path === path);
  const loader = route?.loader;

  if (typeof loader !== "function") {
    throw new Error(`No loader for ${path}`);
  }

  return loader;
};

const runLoader = (path: string) => {
  return getRouteLoader(path)({
    request: new Request(`http://localhost${path}`),
    params: {},
    context: undefined,
  } as never);
};

// TODO
// Get back to it
describe("router", () => {
  beforeEach(() => {
    queryClient.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it("home loader redirects to login when there is no cached user", async () => {
    try {
      await runLoader(ROUTE_HOME);
      throw new Error("expected redirect");
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(302);
      expect((error as Response).headers.get("Location")).toBe(ROUTE_LOGIN);
    }
  });

  it("home loader allows the route when a user is cached", () => {
    queryClient.setQueryData(USER_QUERY_KEY, user);

    expect(runLoader(ROUTE_HOME)).toBeNull();
  });

  it("login loader redirects to home when a user is cached", async () => {
    queryClient.setQueryData(USER_QUERY_KEY, user);

    try {
      await runLoader(ROUTE_LOGIN);
      throw new Error("expected redirect");
    } catch (error) {
      expect(error).toBeInstanceOf(Response);
      expect((error as Response).status).toBe(302);
      expect((error as Response).headers.get("Location")).toBe(ROUTE_HOME);
    }
  });

  it("login loader allows the route when there is no cached user", () => {
    expect(runLoader(ROUTE_LOGIN)).toBeNull();
  });

  it("renders home when a cached user opens /", async () => {
    queryClient.setQueryData(USER_QUERY_KEY, user);
    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.navigate(ROUTE_HOME);
    });

    expect(
      await screen.findByRole("heading", { name: "homepage" }),
    ).toBeInTheDocument();
  });

  it("renders login when there is no cached user on /login", async () => {
    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.navigate(ROUTE_LOGIN);
    });

    expect(
      await screen.findByRole("heading", { name: "Privacy first" }),
    ).toBeInTheDocument();
  });

  it("redirects / to login when there is no cached user", async () => {
    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.navigate(ROUTE_HOME);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: "Privacy first" }),
      ).toBeInTheDocument();
    });
  });

  it("redirects /login to home when a user is cached", async () => {
    queryClient.setQueryData(USER_QUERY_KEY, user);
    render(<RouterProvider router={router} />);

    await act(async () => {
      await router.navigate(ROUTE_LOGIN);
    });

    expect(
      await screen.findByRole("heading", { name: "homepage" }),
    ).toBeInTheDocument();
  });
});
