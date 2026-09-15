import { Cookie } from "lucide-react";
import { useState } from "react";
import {
  COOKIE_ACCEPT,
  COOKIE_ACCEPT_LOCAL_STORAGE,
  COOKIE_CONSENT_KEY,
  COOKIE_REJECT,
  COOKIE_REJECT_LOCAL_STORAGE,
} from "../../../constants/constants";
import { getStoredConsent } from "../core/get-stored-consent";

// TODO + TEST:
// Privacy policy
// Manage preferences

type Consent =
  | typeof COOKIE_ACCEPT_LOCAL_STORAGE
  | typeof COOKIE_REJECT_LOCAL_STORAGE;

export const CookiesContainer = () => {
  const [consent, setConsent] = useState(() => getStoredConsent());

  const persistConsent = (value: Consent) => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, value);
    } catch {
      // Ignore quota / private-mode failures.
    }

    setConsent(value);
  };

  if (consent) {
    return null;
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-surface border border-default rounded-lg flex flex-col gap-4 p-6">
      <div className="w-full flex justify-center items-center gap-2">
        <Cookie
          size={20}
          className="stroke-accent-brand-hot"
          aria-hidden="true"
        />
        <p>We use cookies to improve your experience.</p>
      </div>
      <div className="w-full flex justify-between items-center">
        <button
          className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg bg-transparent border border-default text-primary"
          onClick={() => persistConsent(COOKIE_REJECT_LOCAL_STORAGE)}
        >
          {COOKIE_REJECT}
        </button>
        <button
          className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg bg-accent-brand-hot border border-accent-brand-hot text-black"
          onClick={() => persistConsent(COOKIE_ACCEPT_LOCAL_STORAGE)}
        >
          {COOKIE_ACCEPT}
        </button>
        <button className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg bg-transparent border border-default text-primary">
          Menage preferences
        </button>
      </div>
      <p className="flex gap-1 text-center justify-center">
        Read our{" "}
        <a
          href="#"
          className="text-accent-brand-hot transition-colors duration-300 hover:text-accent-brand"
        >
          Privacy Policy
        </a>
      </p>
    </div>
  );
};
