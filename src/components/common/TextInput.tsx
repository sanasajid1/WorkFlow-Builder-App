import { Input } from "@headlessui/react";
import React from "react";

interface TextInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  type?: string;
  suffix?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder = "",
  className = "",
  name,
  type = "text",
  suffix,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "number") {
      // Only allow numbers and decimal point
      const value = e.target.value;
      if (suffix === "%") {
        // Only allow 0-100
        if (
          value === "" ||
          (/^\d{1,3}$/.test(value) &&
            Number(value) >= 0 &&
            Number(value) <= 100)
        ) {
          onChange?.(e);
        }
      } else {
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
          onChange?.(e);
        }
      }
    } else {
      onChange?.(e);
    }
  };

  if (!suffix) {
    return (
      <Input
        // type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        className={` px-3 py-2 border border-borderGray200 rounded bg-borderGray50 text-sm focus:outline-none ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex items-center px-0 py-0 border border-borderGray200 rounded bg-borderGray50 text-sm focus-within:outline-none ${className}`}
    >
      <Input
        // type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        name={name}
        className={`flex-1 px-3 py-2 bg-transparent border-0 focus:outline-none focus:ring-0 ${className}`}
        style={{ boxShadow: "none" }}
      />
      <span className="pr-3 text-textGray400 text-sm select-none pointer-events-none">
        {suffix}
      </span>
    </div>
  );
};

export default TextInput;
