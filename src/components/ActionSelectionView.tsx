import React, { useState } from "react";
import { ButtonComponent } from "./common/Button";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { SearchBar } from "./common/SearchBar";
import {
  actionTabContent,
  actionTabs,
} from "../services/constants/StringConstants";
import { COLORS } from "../services/constants/ColorConstants";

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
        <div className="flex items-start justify-between mb-2">
          <div>
            <span className="text-lg font-semibold">Select action</span>
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
          <SearchBar placeholder="Search action" />
        </div>
        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <TabList className="flex space-x-6 border-b border-borderGray200 mt-4 mb-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
            {actionTabs.map((tab) => (
              <Tab
                key={tab.name}
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
                    <tab.icon
                      className="w-4 h-4"
                      stroke={
                        selected
                          ? COLORS.BACKGROUND_BLUE_600
                          : COLORS.TEXT_GRAY_500
                      }
                    />
                    {tab.name}
                  </>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {(actionTabContent as any[]).map((content, idx) => (
              <TabPanel key={idx} className="mt-4">
                {content.heading && content.items.length > 0 && (
                  <div className="flex gap-x-1 text-xs text-textGray500 mb-2 uppercase">
                    <content.icon.component {...content.icon.props} />
                    {content.heading}
                  </div>
                )}
                <ul className="space-y-2">
                  {content.items.map((item: any, i: any) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-borderGray50 border border-borderGray200 rounded px-3 py-2 text-sm cursor-pointer hover:bg-borderGray100"
                      onClick={() =>
                        item.view ? onActionSelect(item.view) : undefined
                      }
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
                {content.utilitiesHeading && (
                  <div className="flex gap-x-1 text-xs text-textGray500 mb-2 mt-4 uppercase">
                    {content.utilitiesIcon ? (
                      <content.utilitiesIcon.component
                        {...content.utilitiesIcon.props}
                      />
                    ) : (
                      <content.icon.component {...content.icon.props} />
                    )}
                    {content.utilitiesHeading}
                  </div>
                )}
                <ul className="space-y-2">
                  {content.utilities.map((item: any, i: any) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-borderGray50 border border-borderGray200 rounded px-3 py-2 text-sm cursor-pointer hover:bg-borderGray100"
                      onClick={() =>
                        item.view ? onActionSelect(item.view) : undefined
                      }
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
