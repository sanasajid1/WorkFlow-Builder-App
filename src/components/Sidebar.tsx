import { useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { SearchBar } from "./common/SearchBar";
import ContactCreatedSection from "./ContactCreatedSection";
import {
  General_Texts,
  SideBar_Tabs,
} from "../services/constants/StringConstants";
import { ButtonComponent } from "./common/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import {
  CalendarIcon,
  CheckIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { COLORS } from "../services/constants/ColorConstants";
import ListDetailsIcon from "./customIcons/ListDetailsIcon";
import { useDispatch } from "react-redux";
import { setTrigger } from "../redux/features/workFlow/workFlowSlice";

interface SidebarProps {
  isOpen: boolean;
  toggleSideBar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSideBar }) => {
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);

  const handleSearch = (value: string) => {
    // Handle search logic here
    console.log("Searching for:", value);
  };

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

  const tabs = [
    SideBar_Tabs.All,
    SideBar_Tabs.Contact,
    SideBar_Tabs.Call,
    SideBar_Tabs.Outcome,
    SideBar_Tabs.Appointment,
  ];
  const tabContent = [
    // All tab
    {
      heading: SideBar_Tabs.Contact,
      items: ["Contact created"],
      Icon: <UserIcon stroke={COLORS.TEXT_GRAY_500} className="w-4 h-4" />,
    },
    // Contact tab
    {
      heading: SideBar_Tabs.Contact,
      items: ["Contact created"],
      Icon: <UserIcon stroke={COLORS.TEXT_GRAY_500} className="w-4 h-4" />,
    },
    // Call tab
    {
      heading: SideBar_Tabs.Call,
      items: [],
      Icon: <PhoneIcon stroke={COLORS.TEXT_GRAY_500} className="w-4 h-4" />,
    },
    // Outcome tab
    {
      heading: SideBar_Tabs.Outcome,
      items: [],
      Icon: <CheckIcon stroke={COLORS.TEXT_GRAY_500} className="w-4 h-4" />,
    },
    // Appointment tab
    {
      heading: SideBar_Tabs.Appointment,
      items: [],
      Icon: <CalendarIcon stroke={COLORS.TEXT_GRAY_500} className="w-4 h-4" />,
    },
  ];

  const handleSelectTrigger = (trigger: string) => {
    const newTrigger = {
      type: "contact_created",
      description: "",
      filters: {
        events: [],
        contact_statuses: [],
      },
    };
    dispatch(setTrigger(newTrigger));
    setSelectedTrigger(trigger);
  };

  return (
    <>
      <div
        className={`fixed top-[112px] right-0 h-[calc(100vh-112px)] p-4 overflow-y-auto transition-transform w-96 border-l borderborderGray200 shadow-lg bg-white ${
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
                        {getTabIcon(tab, selected)}
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
                        {content.Icon}
                        {content.heading}
                      </div>
                    )}
                    <ul className="space-y-2">
                      {content.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 bg-borderGray50 border border-borderGray200 rounded px-3 py-2 text-sm cursor-pointer hover:bg-borderGray100"
                          onClick={() => handleSelectTrigger(item)}
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
