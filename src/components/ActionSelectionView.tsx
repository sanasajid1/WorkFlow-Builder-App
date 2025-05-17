import React, { useState } from "react";
import { ButtonComponent } from "./common/Button";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PencilSquareIcon from "./customIcons/PencilSquareIcon";

const tabs = ["All", "Contact", "Call", "Appointment setting", "Utilities"];
const tabContent = [
  // All tab
  {
    heading: "APPOINTMENT SETTING",
    items: [
      { label: "Assign contact to user", view: "assignContact" },
      { label: "Remove assigned user", view: "removeAssignedUser" },
    ],
    utilitiesHeading: "UTILITIES",
    utilities: [
      { label: "If/Else condition", view: "ifElse" },
      { label: "Wait", view: "wait" },
      { label: "Go to", view: "goTo" },
      { label: "Webhook", view: "webhook" },
      { label: "Math operation", view: "mathOperation" },
    ],
  },
  // Contact tab
  {
    heading: "CONTACT",
    items: [],
    utilitiesHeading: null,
    utilities: [],
  },
  // Call tab
  {
    heading: "CALL",
    items: [],
    utilitiesHeading: null,
    utilities: [],
  },
  // Appointment setting tab
  {
    heading: "APPOINTMENT SETTING",
    items: [
      { label: "Assign contact to user", view: "assignContact" },
      { label: "Remove assigned user", view: "removeAssignedUser" },
    ],
    utilitiesHeading: null,
    utilities: [],
  },
  // Utilities tab
  {
    heading: "UTILITIES",
    items: [
      { label: "If/Else condition", view: "ifElse" },
      { label: "Wait", view: "wait" },
      { label: "Go to", view: "goTo" },
      { label: "Webhook", view: "webhook" },
      { label: "Math operation", view: "mathOperation" },
    ],
    utilitiesHeading: null,
    utilities: [],
  },
];

interface ActionSelectionViewProps {
  toggleSideBar: () => void;
  onActionSelect: (view: string) => void;
}

export const ActionSelectionView: React.FC<ActionSelectionViewProps> = ({
  toggleSideBar,
  onActionSelect,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold">Select action</h2>
            <div className="text-xs text-gray-500 mt-1">
              Define what you want to do
            </div>
          </div>
          <ButtonComponent
            onClick={toggleSideBar}
            className="text-textGray400 hover:text-backgroundBlue600 text-xl px-2"
          >
            ×
          </ButtonComponent>
        </div>
        {/* Search */}
        <div className="mt-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search action"
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-6 border-b border-borderGray200 mt-4 mb-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            {tabs.map((tab) => (
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
                    <PencilSquareIcon
                      stroke={selected ? "#2563eb" : "#64748b"}
                      fontSize={16}
                    />
                    {tab}
                  </>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabContent.map((content, idx) => (
              <TabPanel key={idx} className="mt-4">
                {content.heading && content.items.length > 0 && (
                  <div className="flex gap-x-1 text-xs text-textGray500 mb-2 uppercase">
                    <PencilSquareIcon stroke="#64748b" fontSize={16} />
                    {content.heading}
                  </div>
                )}
                <ul className="space-y-2">
                  {content.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-borderGray50 border border-borderGray200 rounded px-3 py-2 text-sm cursor-pointer hover:bg-borderGray100"
                      onClick={() => onActionSelect(item.view)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
                {content.utilitiesHeading && (
                  <div className="flex gap-x-1 text-xs text-textGray500 mb-2 mt-4 uppercase">
                    <PencilSquareIcon stroke="#64748b" fontSize={16} />
                    {content.utilitiesHeading}
                  </div>
                )}
                <ul className="space-y-2">
                  {content.utilities.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-borderGray50 border border-borderGray200 rounded px-3 py-2 text-sm cursor-pointer hover:bg-borderGray100"
                      onClick={() => onActionSelect(item.view)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ActionSelectionView;
