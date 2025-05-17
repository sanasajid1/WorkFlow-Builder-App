import React, { useState, useMemo } from "react";
import {
  executionLogsStatusOptions,
  General_Texts,
  Tab_Panel_Texts,
} from "../services/constants/StringConstants";
import workflowData from "../data/workflow.json";
import Table from "./common/Table";
import { Dropdown } from "./common/Dropdown";
import type { DropdownOption } from "./common/Dropdown";
import type { User } from "../types/workflow";
import { ButtonComponent } from "./common/Button";
import { COLORS } from "../services/constants/ColorConstants";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import StatusTile from "./common/StatusTile";
import HistoryIcon from "./customIcons/HistoryIcon";

const ExecutionLogsComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [dateRange] = useState("2024-03-23 - 2025-03-23");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const contactOptions: DropdownOption[] = useMemo(() => {
    return workflowData.workflow.users.map((user) => ({
      label: user.name,
      value: user.name,
    }));
  }, []);

  const filteredData = useMemo(() => {
    let filtered = [...workflowData.workflow.users];

    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((user) =>
        selectedStatuses.includes(user.status)
      );
    }

    if (selectedContacts.length > 0) {
      filtered = filtered.filter((user) =>
        selectedContacts.includes(user.name)
      );
    }

    return filtered;
  }, [selectedStatuses, selectedContacts]);

  const columns = [
    {
      header: "Header",
      accessor: "name" as keyof User,
      render: (value: string) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full avatar-gradient flex items-center justify-center text-white text-sm">
            {value
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="ml-4 table-row-text-class">{value}</div>
        </div>
      ),
    },
    {
      header: "Action",
      accessor: "action" as keyof User,
      render: (value: string) => (
        <div className="flex items-center table-row-text-class">
          <div className="relative">
            <div className="absolute inset-0 -m-1 w-[24px] h-[24px] bg-borderGray50 rounded-[4px]"></div>
            <div className="relative h-4 w-4 rounded-full border-[1.5px] border-textGray500 mr-2"></div>
          </div>
          {value}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status" as keyof User,
      render: (value: string) => <StatusTile status={value} />,
    },
    {
      header: "Executed On (CEST + 02:00)",
      accessor: "executedOn" as keyof User,
      render: (value: string) => (
        <span className="text-[12px] leading-[150%] table-row-text-class">
          {value}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "id" as keyof User,
      render: () => (
        <div className="flex justify-end">
          <ButtonComponent
            icon={
              <HistoryIcon className="w-4 h-4" stroke={COLORS.TEXT_GRAY_500} />
            }
          />
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <span className="text-base mt-2 font-medium">
        {Tab_Panel_Texts.Execution_Log}
      </span>
      <div className="text-base font-medium text-textGray500 mt-4 mb-6">
        {General_Texts.Execution_Logs_Description}
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={dateRange}
            className="border rounded-lg focus:outline-none focus:ring-0 px-3 py-2 text-sm"
            readOnly
          />

          <Dropdown
            options={executionLogsStatusOptions}
            value={selectedStatuses}
            onChange={(val) =>
              setSelectedStatuses(Array.isArray(val) ? val : [val])
            }
            multiple={true}
            placeholder="Select status"
            isSearch={false}
            className="rounded-lg"
          />

          <div className="w-48">
            <Dropdown
              options={contactOptions}
              value={selectedContacts}
              onChange={(val) =>
                setSelectedContacts(Array.isArray(val) ? val : [val])
              }
              multiple={true}
              placeholder="Select contacts"
              className="rounded-lg"
            />
          </div>
        </div>
        <div>
          <ButtonComponent
            icon={
              <ArrowPathIcon
                className="w-4 h-4"
                stroke={COLORS.TEXT_GRAY_500}
              />
            }
            className="rounded-g8 border-[1px] hover:bg-borderGray50 border-borderGray300 p-2"
          ></ButtonComponent>
        </div>
      </div>

      <Table
        data={filteredData}
        columns={columns}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
};

export default ExecutionLogsComponent;
