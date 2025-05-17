import {
  Tab,
  TabGroup,
  TabList,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TabPanels,
  TabPanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import type React from "react";
import { Tab_Panel_Texts } from "../services/constants/StringConstants";
import PencilSquareIcon from "./customIcons/PencilSquareIcon";
import ListDetailsIcon from "./customIcons/ListDetailsIcon";
import { ButtonComponent } from "./common/Button";
import { ArrowUturnLeftIcon } from "@heroicons/react/16/solid";
import HistoryIcon from "./customIcons/HistoryIcon";
import { COLORS } from "../services/constants/ColorConstants";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { BuilderWorkFlowComponent } from "./BuilderWorkFlow";
import ExecutionLogsComponent from "./ExecutionLogsFlow";

//navbar used for switching between builder and execution log tabs

const tabs = [
  {
    name: Tab_Panel_Texts.Builder,
    Icon: ({ selected }: { selected: boolean }) => (
      <PencilSquareIcon
        fontSize={16}
        stroke={selected ? COLORS.BACKGROUND_BLUE_600 : COLORS.TEXT_GRAY_500}
        className="w-5 h-5"
      />
    ),
  },
  {
    name: Tab_Panel_Texts.Execution_Log,
    Icon: ({ selected }: { selected: boolean }) => (
      <ListDetailsIcon
        fontSize={16}
        stroke={selected ? COLORS.BACKGROUND_BLUE_600 : COLORS.TEXT_GRAY_500}
        className="w-5 h-5"
      />
    ),
  },
];

const zoomLevels = ["100%", "75%", "50%", "25%"];

export const NavBar: React.FC = () => {
  const [selectedZoom, setSelectedZoom] = useState(zoomLevels[0]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-full flex flex-col">
      <TabGroup>
        <div className="flex items-center justify-between border-b border-borderGray200 px-4 bg-white">
          {/* Left Section of Navbar */}
          <TabList className="flex space-x-4">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  `text-base font-medium px-2 py-4 focus:outline-none focus:ring-0 flex items-center gap-2 ${
                    selected
                      ? "text-backgroundBlue600 border-b-2 border-backgroundBlue600"
                      : "text-textGray500"
                  }`
                }
              >
                {({ selected }) => (
                  <>
                    <tab.Icon selected={selected} />
                    {tab.name}
                  </>
                )}
              </Tab>
            ))}
          </TabList>

          {/* Right Section of Navbar */}
          <div className="flex items-center space-x-4">
            <ButtonComponent
              icon={<ArrowUturnLeftIcon className="w-4 h-4 text-textGray500" />}
              className="rounded-g8 border-[1px] border-borderGray200 p-2"
            ></ButtonComponent>
            <ButtonComponent
              icon={<HistoryIcon stroke={COLORS.TEXT_GRAY_500} />}
              className="rounded-g8 border-[1px] border-borderGray200 p-2"
            ></ButtonComponent>

            <div className="relative">
              <Menu>
                <MenuButton className="flex items-center gap-2 border border-borderGray200 rounded-g8 px-2 py-1 text-sm text-textGray500 hover:bg-borderGray100">
                  <MagnifyingGlassIcon className="w-4 h-4 text-textGray500" />
                  {selectedZoom}
                  <ChevronDownIcon className="w-4 h-4" />
                </MenuButton>
                <MenuItems className="absolute right-0 mt-1 w-24 bg-white border border-borderGray200 rounded-g8 shadow-lg focus:outline-none">
                  <div className="py-1">
                    {zoomLevels.map((zoom) => (
                      <MenuItem key={zoom}>
                        {({ active }) => (
                          <button
                            onClick={() => setSelectedZoom(zoom)}
                            className={`${active ? "bg-borderGray100" : ""} ${
                              selectedZoom === zoom
                                ? "text-backgroundBlue600"
                                : "text-textGray500"
                            } group flex w-full items-center px-4 py-2 text-sm`}
                          >
                            {zoom}
                          </button>
                        )}
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        {/* selected tab's content */}
        <TabPanels className="flex-1">
          <TabPanel className="h-full">
            <BuilderWorkFlowComponent onClick={toggleSideBar} />
            <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
          </TabPanel>
          <TabPanel className="h-full">
            <ExecutionLogsComponent />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};
