import { beforeEach, describe, expect, it, vi } from "vitest";
import { getStoredConsent } from "./get-stored-consent";
import {
  COOKIE_ACCEPT_LOCAL_STORAGE,
  COOKIE_CONSENT_KEY,
} from "../../../constants/constants";

describe("get stored consent", () => {
  beforeEach(() => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  });

  it("returns null if localStorage throws", () => {
    const spy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockImplementation(() => {
        throw new Error("Storage unavailable");
      });
    try {
      const getStoredConsentValue = getStoredConsent();
      expect(getStoredConsentValue).toBe(null);
    } finally {
      spy.mockRestore();
    }
  });

  it("returns null if no value in localStorage", () => {
    const getStoredConsentValue = getStoredConsent();
    expect(getStoredConsentValue).toBe(null);
  });

  it("returns COOKIE_ACCEPT_LOCAL_STORAGE if COOKIE_ACCEPT_LOCAL_STORAGE in localStorage", () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, COOKIE_ACCEPT_LOCAL_STORAGE);
    const getStoredConsentValue = getStoredConsent();
    expect(getStoredConsentValue).toBe(COOKIE_ACCEPT_LOCAL_STORAGE);
  });
});
