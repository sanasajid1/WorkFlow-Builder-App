import React, { useState, useEffect, type ReactNode, useRef } from "react";
import { Switch } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import TextInput from "./TextInput";
import { ButtonComponent } from "./Button";
import { General_Texts } from "../../services/constants/StringConstants";

/* custom dropdown used in the entire app using Headless UI's component */

export interface DropdownOption {
  label: ReactNode;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  isSearch?: boolean;
  isCheckBox?: boolean;
  placeholder?: string;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  multiple = false,
  isSearch = false,
  isCheckBox = true,
  placeholder = "Select...",
  className = "",
  onOpenChange,
}) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options.filter((opt) => {
    // If label is a string, filter by it; if not, show all
    if (typeof opt.label === "string") {
      return opt.label.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  useEffect(() => {
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Multi-select: custom logic with Listbox and checkboxes
  const arrValue = Array.isArray(value) ? value : [];
  const handleMultiSelect = (option: DropdownOption) => {
    if (arrValue.includes(option.value)) {
      onChange(arrValue.filter((v) => v !== option.value));
    } else {
      onChange([...arrValue, option.value]);
    }
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <ButtonComponent
        className={`w-full flex items-center justify-between px-3 py-2 border border-borderGray300 rounded bg-white text-sm focus:outline-none ${className}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <span className="truncate text-left">
          {multiple
            ? arrValue.length > 0
              ? `${arrValue.length} selected`
              : placeholder
            : (() => {
                const found = options.find((o) => o.value === value);
                if (!found) return placeholder;
                if (typeof found.label === "string") return found.label;
                return "Selected";
              })()}
        </span>

        <ChevronDownIcon className="w-4 h-4 text-textGray400 ml-2" />
      </ButtonComponent>
      <div
        ref={menuRef}
        className={`absolute z-10 mt-1 w-full bg-white border border-borderGray200 rounded shadow-lg max-h-60 overflow-y-auto ${
          isOpen ? "" : "hidden"
        }`}
      >
        {isSearch && (
          <div className="p-2">
            <TextInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-2"
            />
          </div>
        )}
        <ul>
          {filteredOptions.length === 0 && (
            <li className="px-4 py-2 text-textGray400 text-sm">
              {General_Texts.No_Options}
            </li>
          )}
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className={`flex items-center px-4 py-2 cursor-pointer hover:bg-borderGray100 text-sm`}
              onClick={() => {
                if (multiple) {
                  handleMultiSelect(option);
                } else {
                  // For single selection, if the clicked option is already selected,
                  // uncheck it by setting value to empty string
                  const newValue = value === option.value ? "" : option.value;
                  onChange(newValue);
                  setIsOpen(false);
                }
              }}
            >
              {isCheckBox && (
                <Switch
                  checked={
                    multiple
                      ? arrValue.includes(option.value)
                      : value === option.value
                  }
                  onChange={() => {
                    if (multiple) {
                      handleMultiSelect(option);
                    } else {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  className={`border border-borderGray300 ${
                    multiple
                      ? arrValue.includes(option.value)
                        ? "bg-backgroundBlue600"
                        : "bg-borderGray50"
                      : value === option.value
                      ? "bg-backgroundBlue600"
                      : "bg-borderGray50"
                  } relative inline-flex h-4 w-4 items-center justify-center rounded-md transition-colors focus:outline-none`}
                >
                  <span className="sr-only">
                    Select
                    {typeof option.label === "string" ? option.label : "option"}
                  </span>

                  {multiple ? (
                    arrValue.includes(option.value) ? (
                      <CheckIcon className="h-3 w-3 text-white" />
                    ) : null
                  ) : value === option.value ? (
                    <CheckIcon className="h-3 w-3 text-white" />
                  ) : null}
                </Switch>
              )}
              <span className="flex-1 ml-2">{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
