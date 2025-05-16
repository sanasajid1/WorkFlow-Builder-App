import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import PencilSquareIcon from "./customIcons/PencilSquareIcon";
import { SearchBar } from "./common/SearchBar";
import ContactCreatedSection from "./ContactCreatedSection";
import { General_Texts } from "../services/constants/StringConstants";

interface SidebarProps {
  isOpen: boolean;
  toggleSideBar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSideBar }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    // Handle search logic here
    console.log("Searching for:", value);
  };

  const tabs = ["All", "Contact", "Call", "Outcome", "Appointment"];
  const tabContent = [
    // All tab
    {
      heading: "Contact",
      items: ["Contact created"],
    },
    // Contact tab
    {
      heading: null,
      items: ["Contact created"],
    },
    // Call tab
    {
      heading: null,
      items: [],
    },
    // Outcome tab
    {
      heading: null,
      items: [],
    },
    // Appointment tab
    {
      heading: null,
      items: [],
    },
  ];

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full p-4 overflow-y-auto transition-transform w-96 border-l borderborderGray200 shadow-lg bg-white ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {selectedTrigger === "Contact created" ? (
          <ContactCreatedSection setSelectedTrigger={setSelectedTrigger} />
        ) : (
          <>
            <span className="inline-flex text-textGray900 items-center mb-4 text-base font-semibold">
              {General_Texts.Select_Trigger}
            </span>
            <button
              type="button"
              onClick={toggleSideBar}
              className="bg-transparent  rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">{General_Texts.Close_Menu}</span>
            </button>

            <p className="mb-6 text-sm text-borderGray500">
              {General_Texts.Define_The_Trigger}
            </p>

            <SearchBar placeholder="Search trigger" onChange={handleSearch} />

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
                    {content.heading && (
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
                          onClick={() => setSelectedTrigger(item)}
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
        )}
      </div>
    </>
  );
};
