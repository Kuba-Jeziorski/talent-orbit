import type { PrivacyContainerProps } from "../domain/model";

export const PrivacyContainer = ({ setStep }: PrivacyContainerProps) => {
  const handleStep = () => {
    setStep("form");
  };

  return (
    <div className="w-full max-w-3xl flex flex-col justify-center px-12">
      <div className="w-full max-w-55">
        <h1 className="text-3xl mb-2">Privacy first</h1>
        <p className="text-base mb-4">
          We protect your data and keep it private
        </p>
        <div className="flex w-full">
          <button
            className="w-full bg-accent-brand-hot text-black py-2 px-8 text-lg flex items-center justify-center rounded-xl mb-4 cursor-pointer transition-bg duration-300 hover:bg-accent-brand"
            onClick={handleStep}
          >
            Continue
          </button>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="flex-1 h-px bg-secondary/50"></span>
          <p>or</p>
          <span className="flex-1 h-px bg-secondary/50"></span>
        </div>
        <a
          href="#"
          className="text-accent-brand-hot text-xl text-center flex justify-center items-center transition-colors duration-300 hover:text-accent-brand"
        >
          Join exam
        </a>
      </div>
    </div>
  );
};
