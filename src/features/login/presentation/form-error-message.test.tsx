import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { FormErrorMessage } from "./form-error-message";
import "@testing-library/jest-dom/vitest";

describe("form error message", () => {
  afterEach(() => {
    cleanup();
  });

  it("passing string as children", () => {
    const passedString = "Please enter your email";
    render(<FormErrorMessage>{passedString}</FormErrorMessage>);
    expect(screen.getByText(passedString)).toBeInTheDocument();
  });
});
