import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import { CookiesContainer } from "./cookies-container";
import {
  COOKIE_ACCEPT,
  COOKIE_ACCEPT_LOCAL_STORAGE,
  COOKIE_CONSENT_KEY,
  COOKIE_REJECT,
  COOKIE_REJECT_LOCAL_STORAGE,
} from "../../../constants/constants";

describe("Cookies container", () => {
  beforeEach(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  });

  afterEach(() => {
    cleanup();
  });

  it("cookies container rendered when no value in localStorage", () => {
    render(<CookiesContainer />);
    const rejectButton = screen.getByRole("button", { name: COOKIE_REJECT });
    const acceptButton = screen.getByRole("button", { name: COOKIE_ACCEPT });
    expect(rejectButton).toBeInTheDocument();
    expect(acceptButton).toBeInTheDocument();
  });

  it.each([
    {
      localStorageValue: COOKIE_REJECT_LOCAL_STORAGE,
    },
    {
      localStorageValue: COOKIE_ACCEPT_LOCAL_STORAGE,
    },
  ])(
    "cookies container not rendered when $localStorageValue in localStorage",
    ({ localStorageValue }) => {
      localStorage.setItem(COOKIE_CONSENT_KEY, localStorageValue);
      render(<CookiesContainer />);
      const rejectButton = screen.queryByRole("button", {
        name: COOKIE_REJECT,
      });
      const acceptButton = screen.queryByRole("button", {
        name: COOKIE_ACCEPT,
      });
      expect(rejectButton).not.toBeInTheDocument();
      expect(acceptButton).not.toBeInTheDocument();
    },
  );

  it.each([
    {
      buttonName: COOKIE_REJECT,
      buttonLocalStorageValue: COOKIE_REJECT_LOCAL_STORAGE,
    },
    {
      buttonName: COOKIE_ACCEPT,
      buttonLocalStorageValue: COOKIE_ACCEPT_LOCAL_STORAGE,
    },
  ])(
    "clicking $buttonName writes $buttonLocalStorageValue to localStorage",
    async ({ buttonName, buttonLocalStorageValue }) => {
      render(<CookiesContainer />);
      const button = screen.getByRole("button", { name: buttonName });
      await userEvent.click(button);
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
      expect(storedConsent).toBe(buttonLocalStorageValue);
      const afterClickButton = screen.queryByRole("button", {
        name: buttonName,
      });
      expect(afterClickButton).not.toBeInTheDocument();
    },
  );
});
