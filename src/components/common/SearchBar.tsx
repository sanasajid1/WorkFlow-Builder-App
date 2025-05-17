import { Input } from "@headlessui/react";
import SearchBarIcon from "../customIcons/SearchBarIcon";

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
        <SearchBarIcon />
      </div>
      <Input
        type="search"
        className={`block w-full p-2 pl-8 bg-borderGray50 text-sm text-textGray900 border border-borderGray300 rounded-lg outline-none focus:outline-none focus:ring-0 focus:border-borderGray300 ${className}`}
        placeholder={placeholder}
        name={name}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
