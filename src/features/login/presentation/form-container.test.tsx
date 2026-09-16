import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { FormContainer } from "./form-container";
import userEvent from "@testing-library/user-event";
import { useLogin } from "../api/use-login";
import "@testing-library/jest-dom/vitest";

vi.mock("../api/use-login");

const mockUseLogin = vi.mocked(useLogin);
const login = vi.fn();

describe("form container", () => {
  beforeEach(() => {
    login.mockReset();
    mockUseLogin.mockReturnValue({ login, isPending: false });
  });

  afterEach(() => {
    cleanup();
  });

  // TEST 1 - default render
  it("default render", () => {
    render(<FormContainer />);
    const heading = screen.getByText("Welcome back");
    const emailInput = screen.getByLabelText("Email");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    expect(heading).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(
      screen.queryByText("Please enter your email"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please enter your password"),
    ).not.toBeInTheDocument();
  });

  // TEST 2 - submit with empty fields
  it("submit with empty fields", async () => {
    render(<FormContainer />);
    const submitButton = screen.getByRole("button", { name: "Sign in" });

    await userEvent.click(submitButton);

    expect(screen.getByText("Please enter your email")).toBeInTheDocument();
    expect(screen.getByText("Please enter your password")).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  // TEST 3 - only one field filled
  it.each([
    {
      fill: "email",
      email: "test@test.com",
      password: "",
      visibleError: "Please enter your password",
      hiddenError: "Please enter your email",
    },
    {
      fill: "password",
      email: "",
      password: "password",
      visibleError: "Please enter your email",
      hiddenError: "Please enter your password",
    },
  ])(
    "submit with only $fill filled",
    async ({ email, password, visibleError, hiddenError }) => {
      render(<FormContainer />);

      if (email) {
        await userEvent.type(screen.getByLabelText("Email"), email);
      }

      if (password) {
        await userEvent.type(screen.getByLabelText("Password"), password);
      }

      await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

      expect(screen.getByText(visibleError)).toBeInTheDocument();
      expect(screen.queryByText(hiddenError)).not.toBeInTheDocument();
      expect(login).not.toHaveBeenCalled();
    },
  );

  // TEST 4 - valid submit
  it("valid submit calls login with email and password", async () => {
    render(<FormContainer />);

    await userEvent.type(screen.getByLabelText("Email"), "test@test.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(login).toHaveBeenCalledTimes(1);
    expect(login).toHaveBeenCalledWith(
      { email: "test@test.com", password: "password" },
      expect.objectContaining({ onSettled: expect.any(Function) }),
    );
  });

  // TEST 5 - typing clears error field
  it("typing clears that field error", async () => {
    render(<FormContainer />);

    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));
    expect(screen.getByText("Please enter your email")).toBeInTheDocument();
    expect(screen.getByText("Please enter your password")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Email"), "t");
    expect(
      screen.queryByText("Please enter your email"),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Please enter your password")).toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("Password"), "p");
    expect(
      screen.queryByText("Please enter your password"),
    ).not.toBeInTheDocument();
  });

  // TEST 6 - show/hide password
  it("toggles password visibility", async () => {
    render(<FormContainer />);
    const passwordInput = screen.getByLabelText("Password");

    expect(passwordInput).toHaveAttribute("type", "password");
    await userEvent.click(screen.getByRole("button", { name: "Show" }));
    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: "Hide" })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Hide" }));
    expect(passwordInput).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();
    expect(login).not.toHaveBeenCalled();
  });

  // TEST 7 - isPending causing submit button and inputs disabled
  it("disables fields and submit while pending", () => {
    mockUseLogin.mockReturnValue({ login, isPending: true });
    render(<FormContainer />);

    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Password")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeDisabled();
  });

  // TODO
  // Add "Keep me signed in" checkbox reset in the future
  it("resets the form when login settles", async () => {
    login.mockImplementation((_credentials, { onSettled }) => {
      onSettled();
    });

    render(<FormContainer />);

    await userEvent.type(screen.getByLabelText("Email"), "test@test.com");
    await userEvent.type(screen.getByLabelText("Password"), "password");
    await userEvent.click(screen.getByLabelText("Keep me signed in"));
    await userEvent.click(screen.getByRole("button", { name: "Show" }));
    await userEvent.click(screen.getByRole("button", { name: "Sign in" }));

    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Password")).toHaveValue("");
    expect(screen.getByLabelText("Password")).toHaveAttribute(
      "type",
      "password",
    );
    expect(screen.getByLabelText("Keep me signed in")).not.toBeChecked();
    expect(screen.getByRole("button", { name: "Show" })).toBeInTheDocument();
    expect(
      screen.queryByText("Please enter your email"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText("Please enter your password"),
    ).not.toBeInTheDocument();
  });
});
