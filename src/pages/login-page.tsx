import { useState } from "react";
import { cn } from "../libs/utils/css/css";
import type { Step } from "../features/login/domain/model";
import { LogoContainer } from "../features/login/presentation/logo-container";
import { PrivacyContainer } from "../features/login/presentation/privacy-container";
import { CookiesContainer } from "../features/login/presentation/cookies-container";
import { FormContainer } from "../features/login/presentation/form-container";

export const LoginPage = () => {
  const [step, setStep] = useState<Step>("welcome");

  return (
    <div
      className={cn(
        "w-screen h-screen text-primary flex",
        step === "welcome" ? "bg-app" : "bg-page",
      )}
    >
      {step === "welcome" ? (
        <div className="w-full max-w-375 mx-auto flex flex-col py-5 gap-5">
          <div className="w-full flex-1 flex justify-center">
            <LogoContainer />
            <div className="h-full w-0.5 bg-linear-to-b from-transparent via-white to-transparent"></div>
            <PrivacyContainer setStep={setStep} />
          </div>
          <CookiesContainer />
        </div>
      ) : (
        <div className="w-full h-full max-w-375 mx-auto flex justify-center items-center">
          <FormContainer />
        </div>
      )}
    </div>
  );
};
