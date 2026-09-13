export type Step = "welcome" | "form";

export type PrivacyContainerProps = {
  setStep: React.Dispatch<React.SetStateAction<Step>>;
};
