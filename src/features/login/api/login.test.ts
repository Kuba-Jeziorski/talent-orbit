import { beforeEach, describe, expect, it, vi } from "vitest";
import { supabase } from "../../../libs/supabase/client";
import { login } from "./login";

vi.mock("../../../libs/supabase/client", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

const signInWithPassword = vi.mocked(supabase.auth.signInWithPassword);

describe("login function", () => {
  beforeEach(() => {
    signInWithPassword.mockReset();
  });

  it("success", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: { id: "1", email: "test@test.com" } },
      error: null,
    } as never);

    await expect(
      login({ email: "test@test.com", password: "password" }),
    ).resolves.toMatchObject({
      user: {
        email: "test@test.com",
      },
    });

    // At this point mock history is no longer empty so order
    // of expects matters
    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "test@test.com",
      password: "password",
    });
  });

  it("supabase error", async () => {
    signInWithPassword.mockResolvedValue({
      data: { user: null },
      error: { message: "incorrect credentials" },
    } as never);

    await expect(
      login({ email: "test@test.com", password: "password" }),
    ).rejects.toThrow("incorrect credentials");
  });
});
