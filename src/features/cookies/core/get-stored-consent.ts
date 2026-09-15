import { COOKIE_CONSENT_KEY } from "../../../constants/constants";

export const getStoredConsent = () => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
};
