import { Moon, Cookie } from "lucide-react";

const LogoContainer = () => {
  return (
    <div className="w-full max-w-3xl flex flex-col justify-center items-center gap-2 pb-20">
      <Moon
        size={128}
        className="-rotate-45 fill-accent-brand-hot stroke-accent-brand-hot"
        aria-hidden="true"
      />
      <div className="flex flex-col gap-1 justify-center items-center">
        <p className="text-3xl tracking-[8px]">TALENT</p>
        <p className="text-3xl tracking-[8px]">ORBIT</p>
      </div>
    </div>
  );
};

const PrivacyContainer = () => {
  return (
    <div className="w-full max-w-3xl flex flex-col justify-center px-12">
      <div className="w-full max-w-55">
        <h1 className="text-3xl mb-2">Privacy first</h1>
        <p className="text-base mb-4">
          We protect your data and keep it private
        </p>
        <div className="flex w-full">
          <button className="w-full bg-accent-brand-hot text-black py-2 px-8 text-lg flex items-center justify-center rounded-xl mb-4 cursor-pointer transition-bg duration-300 hover:bg-accent-brand">
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

export const LoginPage = () => {
  return (
    <div className="w-screen h-screen bg-page text-primary flex">
      <div className="w-full max-w-375 mx-auto flex flex-col py-5 gap-5">
        <div className="w-full flex-1 flex justify-center">
          <LogoContainer />
          <div className="h-full w-0.5 bg-linear-to-b from-transparent via-white to-transparent"></div>
          <PrivacyContainer />
        </div>
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
            <button className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg bg-transparent border border-default text-primary">
              Reject optional
            </button>
            <button className="cursor-pointer flex items-center justify-center px-4 py-2 rounded-lg bg-accent-brand-hot border border-accent-brand-hot text-black">
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
      </div>
    </div>
  );
};
