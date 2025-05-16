import { Input } from "@headlessui/react";

interface SearchBarProps {
  placeholder?: string;
  name?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const SearchBar = ({
  placeholder = "Search...",
  name = "search",
  className = "",
  onChange,
}: SearchBarProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <Input
        type="search"
        className={`block w-full p-2 pl-10 text-sm text-textGray900 border border-borderGray300 rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-borderGray300 ${className}`}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
