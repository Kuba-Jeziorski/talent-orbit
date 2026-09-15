import { beforeEach, describe, expect, it, vi } from "vitest";
import { supabase } from "../supabase/client";
import { getSessionUser } from "./get-session-user";

// fake file
vi.mock("../supabase/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

const getSession = vi.mocked(supabase.auth.getSession);

describe("get session user", () => {
  beforeEach(() => {
    getSession.mockReset();
  });

  it("returns the user when a session exists", async () => {
    getSession.mockResolvedValue({
      data: { session: { user: { id: "1", email: "test@test.com" } } },
      error: null,
      // resolve type is more complicated object so "as never" is a type-skip
    } as never);

    // original getSessionUser function is called, but when await supabase.auth.getSession() is executed
    // the mocked version (getSession) is hit and executed

    // toMatchObject - must include; other keys are allowed
    await expect(getSessionUser()).resolves.toMatchObject({
      email: "test@test.com",
    });
  });

  it("returns null when there is no session", async () => {
    getSession.mockResolvedValue({
      data: { session: null },
      error: null,
    } as never);

    await expect(getSessionUser()).resolves.toBeNull();
  });

  it("throws when getSession returns an error", async () => {
    getSession.mockResolvedValue({
      data: { session: null },
      error: { message: "session failed" },
    } as never);

    await expect(getSessionUser()).rejects.toThrow("session failed");
  });
});
