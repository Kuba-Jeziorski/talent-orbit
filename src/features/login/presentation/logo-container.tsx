import { Moon } from "lucide-react";

export const LogoContainer = () => {
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
