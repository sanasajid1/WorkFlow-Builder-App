import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import TextInput from "./TextInput";
import { ButtonComponent } from "./Button";
import { General_Texts } from "../../services/constants/StringConstants";

/* With the current implementation using Headless UI's Menu, 
 you can select multiple options by clicking each one, but the menu 
 does not stay open after each selection, it closes after every click. 
 This is because the Menu component is designed for single-action dropdowns, 
 not persistent multi-select lists. */

export interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string | string[];
  onChange: (value: string | string[]) => void;
  multiple?: boolean;
  placeholder?: string;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  multiple = false,
  placeholder = "Select...",
  className = "",
}) => {
  const [search, setSearch] = useState("");
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  // Single select using Listbox
  if (!multiple) {
    return (
      <Listbox value={value} onChange={onChange}>
        <div className={`relative ${className}`}>
          <ListboxButton className="w-full flex items-center justify-between px-3 py-2 border border-borderGray300 rounded bg-white text-sm focus:outline-none">
            <span className="truncate text-left">
              {options.find((o) => o.value === value)?.label || placeholder}
            </span>
            <ChevronDownIcon className="w-4 h-4 text-textGray400 ml-2" />
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border border-borderGray200 rounded shadow-lg max-h-48 overflow-y-auto">
            <div className="p-2">
              <TextInput
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="mb-2"
              />
            </div>
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 text-textGray400 text-sm">
                {General_Texts.No_Options}
              </div>
            )}
            {filteredOptions.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className={({ active, selected }) =>
                  `flex items-center px-4 py-2 cursor-pointer text-sm ${
                    active ? "bg-borderGray100" : ""
                  } ${selected ? "bg-backgroundBlue600" : ""}`
                }
              >
                {({ selected }) => (
                  <>
                    <span className="flex-1">{option.label}</span>
                    {selected && (
                      <CheckIcon className="w-4 h-4 text-backgroundBlue600 ml-2" />
                    )}
                  </>
                )}
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    );
  }

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
    <div className={`relative ${className}`}>
      <ButtonComponent
        className="w-full flex items-center justify-between px-3 py-2 border border-borderGray300 rounded bg-white text-sm focus:outline-none"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const menu = document.getElementById("dropdown-multi-menu");
          if (menu) menu.classList.toggle("hidden");
        }}
      >
        <span className="truncate text-left">
          {arrValue.length > 0
            ? options
                .filter((o) => arrValue.includes(o.value))
                .map((o) => o.label)
                .join(", ")
            : placeholder}
        </span>
        <ChevronDownIcon className="w-4 h-4 text-textGray400 ml-2" />
      </ButtonComponent>
      <div
        id="dropdown-multi-menu"
        className="absolute z-10 mt-1 w-full bg-white border border-borderGray200 rounded shadow-lg max-h-60 overflow-y-auto hidden"
      >
        <div className="p-2">
          <TextInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
          />
        </div>
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
              onClick={() => handleMultiSelect(option)}
            >
              <Switch
                checked={arrValue.includes(option.value)}
                onChange={() => handleMultiSelect(option)}
                className={`border border-borderGray300 ${
                  arrValue.includes(option.value)
                    ? "bg-backgroundBlue600"
                    : "bg-borderGray50"
                } relative inline-flex h-4 w-4 items-center justify-center rounded-md transition-colors focus:outline-none`}
              >
                <span className="sr-only">Select {option.label}</span>
                {arrValue.includes(option.value) && (
                  <CheckIcon className="h-3 w-3 text-white" />
                )}
              </Switch>
              <span className="flex-1 ml-2">{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
