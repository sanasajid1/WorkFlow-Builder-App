// components/Button.tsx
import type { ReactNode } from "react";
import { Button } from "@headlessui/react";

type ButtonProps = {
  onClick?: (e: any) => void;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export const ButtonComponent: React.FC<ButtonProps> = ({
  onClick,
  icon,
  children,
  className,
  disabled = false,
}) => {
  return (
    <Button onClick={onClick} className={className} disabled={disabled}>
      {icon}
      {children}
    </Button>
  );
};
