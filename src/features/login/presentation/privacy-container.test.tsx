import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PrivacyContainer } from "./privacy-container";
import userEvent from "@testing-library/user-event";

describe("privacy container", () => {
  afterEach(() => {
    cleanup();
  });

  it("clicking Continue sets step to form", async () => {
    const setStep = vi.fn();
    render(<PrivacyContainer setStep={setStep} />);
    const button = screen.getByRole("button", { name: "Continue" });
    await userEvent.click(button);
    expect(setStep).toHaveBeenCalledTimes(1);
  });
});
