import { CircleAlert } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const FormErrorMessage = ({ children }: Props) => {
  return (
    <div className="absolute -bottom-6 text-accent-error text-sm flex items-center gap-1">
      <span className="text-inherit">
        <CircleAlert size={16} />
      </span>
      {children}
    </div>
  );
};
