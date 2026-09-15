import { lazy, Suspense, useState } from "react";
import { cn } from "../libs/css/cn";
import type { Step } from "../features/login/domain/model";
import { Spinner } from "../libs/ui/spinner";
import { LogoContainer } from "../features/login/presentation/logo-container";
import { PrivacyContainer } from "../features/login/presentation/privacy-container";
import { CookiesContainer } from "../features/cookies/presentation/cookies-container";

const FormContainer = lazy(() =>
  import("../features/login/presentation/form-container").then((module) => ({
    default: module.FormContainer,
  })),
);

// TEST
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
          <Suspense fallback={<Spinner />}>
            <FormContainer />
          </Suspense>
        </div>
      )}
    </div>
  );
};
