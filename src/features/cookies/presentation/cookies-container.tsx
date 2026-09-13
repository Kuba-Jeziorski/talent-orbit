import { Cookie } from "lucide-react";
import { useState } from "react";
import { COOKIE_CONSENT_KEY } from "../../../constants/constants";

type Consent = "accepted" | "rejected";

const getStoredConsent = () => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    return null;
  }
};

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
    <div className="w-full max-w-lg mx-auto border border-default rounded-lg flex flex-col gap-4 p-6">
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
          onClick={() => persistConsent("rejected")}
        >
          Reject optional
        </button>
        <button
          className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg bg-accent-brand-hot border border-accent-brand-hot text-black"
          onClick={() => persistConsent("accepted")}
        >
          Accept all
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
