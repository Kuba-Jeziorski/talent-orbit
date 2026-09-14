import { useState, type SubmitEvent } from "react";
import { useLogin } from "../api/use-login";
import {
  Check,
  CircleAlert,
  Eye,
  EyeClosed,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { cn } from "../../../libs/css/cn";

export const FormContainer = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const { login, isPending } = useLogin();

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!email) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (!email || !password) {
      return;
    }

    login(
      { email, password },
      {
        onSettled: () => {
          handleReset();
        },
      },
    );
  };

  const toggleVisible = () => {
    setPasswordVisible((passwordVisible) => !passwordVisible);
  };

  return (
    <div className="w-full max-w-100 mx-auto flex flex-col p-8 bg-surface border border-default rounded-lg">
      <h1 className="text-3xl mb-1">Welcome back</h1>
      <p>Sign in to continue</p>
      <form onSubmit={handleSubmit} className="w-full flex flex-col mt-4">
        <div className="flex flex-col w-full gap-1 relative">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
            className="border border-default rounded-lg h-12 pl-12 pr-4 bg-transparent text-lg relative z-2"
          />
          <div className="absolute z-1 top-10 left-3 w-6 h-6">
            <Mail className="w-full h-full object-contain stroke-2" />
          </div>
          {emailError && (
            <div className="absolute -bottom-6 text-accent-error text-sm flex items-center gap-1">
              <span className="text-inherit">
                <CircleAlert size={16} />
              </span>
              Please enter your email
            </div>
          )}
        </div>
        <div className="flex flex-col w-full gap-1 mt-8 mb-10 relative">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
            className={cn(
              "border border-default rounded-lg h-12 pr-19 pl-3 bg-transparent text-lg relative",
              !passwordVisible && "tracking-[6px]",
            )}
          />
          <button
            className="cursor-pointer absolute top-11 right-3 flex items-center gap-2 text-xs"
            onClick={toggleVisible}
          >
            {passwordVisible ? (
              <>
                <EyeClosed size={20} />
                <span>Hide</span>
              </>
            ) : (
              <>
                <Eye size={20} />
                <span>Show</span>
              </>
            )}
          </button>
          {passwordError && (
            <div className="absolute -bottom-6 text-accent-error text-sm flex items-center gap-1">
              <span className="text-inherit">
                <CircleAlert size={16} />
              </span>
              Please enter your password
            </div>
          )}
        </div>
        <div className="flex flex-row w-full items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-1">
            <span className="relative size-4 shrink-0">
              <input
                type="checkbox"
                id="keep-signed-in"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="size-4 appearance-none rounded-sm bg-transparent border border-default cursor-pointer"
              />
              {keepSignedIn && (
                <Check
                  className="pointer-events-none absolute top-0.5 left-px m-auto size-3.5 text-primary"
                  strokeWidth={3}
                />
              )}
            </span>
            <label htmlFor="keep-signed-in" className="text-sm">
              Keep me signed in
            </label>
          </div>
          <a href="#" className="text-accent-brand-soft text-sm">
            Forgot password?
          </a>
        </div>
        <div className="flex w-full">
          <button
            type="submit"
            className="w-full bg-accent-brand-hot text-black py-2 px-8 text-lg flex items-center justify-center rounded-xl mb-4 cursor-pointer transition-bg duration-300 hover:bg-accent-brand"
          >
            Sign in
          </button>
        </div>
      </form>
      <div className="flex items-center gap-2 mb-4">
        <span className="flex-1 h-px bg-secondary/50"></span>
        <p>or</p>
        <span className="flex-1 h-px bg-secondary/50"></span>
      </div>
      <div className="flex w-full">
        <a
          href="#"
          className="w-full cursor-pointer text-lg flex gap-2 items-center justify-center px-4 py-2 rounded-lg bg-transparent border border-default text-primary"
        >
          <ShieldCheck />
          Sign in with SSO
        </a>
      </div>
    </div>
  );
};
