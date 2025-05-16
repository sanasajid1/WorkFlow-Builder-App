import { Input } from "@headlessui/react";
import React from "react";

interface TextInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  name,
  type = "text",
}) => {
  return (
    <Input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className={`w-full px-3 py-2 border border-borderGray200 rounded bg-borderGray50 text-sm focus:outline-none ${className}`}
    />
  );
};

export default TextInput;
