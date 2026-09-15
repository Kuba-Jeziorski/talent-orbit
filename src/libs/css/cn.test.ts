import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn function", () => {
  it("returns empty string with no arguments passed", () => {
    const cnValue = cn();
    expect(cnValue).toBe("");
  });

  it("returns concatenated values", () => {
    const value1 = "cat";
    const value2 = "dog";
    const value3 = "owl";

    const cnValue = cn(value1, value2, value3);
    expect(cnValue).toBe("cat dog owl");
  });

  it("omits falsy inputs", () => {
    const condition1 = false;
    const condition2 = true;

    const value1 = "dog";
    const value2 = condition1 && "cat";
    const value3 = undefined;
    const value4 = condition2 && "owl";

    const cnValue = cn(value1, value2, value3, value4);
    expect(cnValue).toBe("dog owl");
  });

  it("later Tailwind class wins on conflict", () => {
    const value1 = "mb-4";
    const value2 = "pb-2";
    const value3 = "pb-4";

    const cnValue = cn(value1, value2, value3);
    expect(cnValue).toBe("mb-4 pb-4");
  });
});
