import React, { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { SearchBar } from "./common/SearchBar";
import { ButtonComponent } from "./common/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  CalendarIcon,
  CheckIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import ListDetailsIcon from "./customIcons/ListDetailsIcon";
import { COLORS } from "../services/constants/ColorConstants";
import {
  General_Texts,
  SideBar_Tabs,
  triggerTabContent,
  triggerTabs,
} from "../services/constants/StringConstants";

interface TriggerSelectionViewProps {
  onTriggerSelect: (trigger: string) => void;
  onShowActionView: () => void;
  toggleSideBar: () => void;
}

const getTabIcon = (tab: string, selected: boolean) => {
  const iconProps = {
    className: "w-4 h-4",
    stroke: selected ? COLORS.BACKGROUND_BLUE_600 : COLORS.TEXT_GRAY_500,
  };
  switch (tab) {
    case SideBar_Tabs.All:
      return <ListDetailsIcon {...iconProps} />;
    case SideBar_Tabs.Contact:
      return <UserIcon {...iconProps} />;
    case SideBar_Tabs.Call:
      return <PhoneIcon {...iconProps} />;
    case SideBar_Tabs.Outcome:
      return <CheckIcon {...iconProps} />;
    case SideBar_Tabs.Appointment:
      return <CalendarIcon {...iconProps} />;
    default:
      return null;
  }
};

const TriggerSelectionView: React.FC<TriggerSelectionViewProps> = ({
  onTriggerSelect,
  toggleSideBar,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  // Filter triggerTabContent based on searchValue
  const filteredTabContent = triggerTabContent.map((content) => {
    if (!searchValue.trim()) return content;
    const filteredItems = content.items.filter((item: string) =>
      item.toLowerCase().includes(searchValue.toLowerCase())
    );
    return { ...content, items: filteredItems };
  });

  return (
    <>
      <span className="inline-flex text-textGray900 items-center mb-4 text-base font-semibold">
        {General_Texts.Select_Trigger}
      </span>
      <ButtonComponent
        onClick={toggleSideBar}
        className="bg-transparent  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
      >
        <XMarkIcon className="w-5 h-5" />
        <span className="sr-only">{General_Texts.Close_Menu}</span>
      </ButtonComponent>
      <p className="mb-6 text-sm text-textGray500">
        {General_Texts.Define_The_Trigger}
      </p>
      <SearchBar placeholder="Search trigger" onChange={handleSearch} />
      <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
        <TabList className="flex space-x-6 border-b border-borderGray200 mt-4 mb-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
          {triggerTabs.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                `py-1.5 text-sm rounded-t focus:outline-none transition-colors flex items-center gap-1 ${
                  selected
                    ? "text-backgroundBlue600 border-b-2 border-backgroundBlue600 bg-white"
                    : "text-textGray500 hover:text-backgroundBlue600 border-b-2 border-transparent"
                }`
              }
            >
              {({ selected }) => (
                <>
                  {getTabIcon(tab, selected)}
                  {tab}
                </>
              )}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {filteredTabContent.map((content, idx) => (
            <TabPanel key={idx} className="mt-4">
              {content.heading && content.items.length > 0 && (
                <div className="flex gap-x-1 text-xs text-textGray500 mb-2 uppercase">
                  {React.createElement(
                    content.icon.component,
                    content.icon.props
                  )}
                  {content.heading}
                </div>
              )}
              <ul className="space-y-2">
                {content.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-borderGray50 border border-borderGray200 rounded px-3 py-2 text-sm cursor-pointer hover:bg-borderGray100"
                    onClick={() => onTriggerSelect(item)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default TriggerSelectionView;
