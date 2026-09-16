import { cleanup, render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router";
import {
  COOKIE_ACCEPT,
  COOKIE_CONSENT_KEY,
  COOKIE_REJECT,
} from "../constants/constants";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { LoginPage } from "./login-page";

const renderLoginPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  // Router is needed, because when FormContainer is rendered a router-related hook
  // useLogin() is executed
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </QueryClientProvider>,
  );
};

describe("login page", () => {
  beforeEach(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  });

  afterEach(() => {
    cleanup();
  });

  it("displays logo, privacy, and cookies on the welcome step", () => {
    renderLoginPage();

    expect(screen.getByText("TALENT")).toBeInTheDocument();
    expect(screen.getByText("ORBIT")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Privacy first" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Continue" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: COOKIE_REJECT }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: COOKIE_ACCEPT }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign in" }),
    ).not.toBeInTheDocument();
  });

  it("displays the form after Continue", async () => {
    renderLoginPage();

    await userEvent.click(screen.getByRole("button", { name: "Continue" }));

    expect(
      await screen.findByRole("button", { name: "Sign in" }),
    ).toBeInTheDocument();
    expect(screen.queryByText("TALENT")).not.toBeInTheDocument();
    expect(screen.queryByText("ORBIT")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Privacy first" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: COOKIE_REJECT }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: COOKIE_ACCEPT }),
    ).not.toBeInTheDocument();
  });
});
