import React, { useState, useMemo } from "react";
import {
  General_Texts,
  Tab_Panel_Texts,
} from "../services/constants/StringConstants";
import workflowData from "../data/workflow.json";
import Table from "./common/Table";
import { Dropdown } from "./common/Dropdown";
import type { DropdownOption } from "./common/Dropdown";
import type { User } from "../types/workflow";

const ExecutionLogsComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [dateRange] = useState("2024-03-23 - 2025-03-23");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const statusOptions: DropdownOption[] = [
    { label: "Error", value: "Error" },
    { label: "Finished", value: "Finished" },
  ];

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
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm">
            {value
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="ml-4 text-sm font-medium text-gray-900">{value}</div>
        </div>
      ),
    },
    {
      header: "Action",
      accessor: "action" as keyof User,
      render: (value: string) => (
        <div className="flex items-center">
          <div className="h-4 w-4 rounded-full border border-gray-300 mr-2"></div>
          {value}
        </div>
      ),
    },
    {
      header: "Status",
      accessor: "status" as keyof User,
      render: (value: string) => (
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            value === "Finished"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      header: "Executed On (CEST + 02:00)",
      accessor: "executedOn" as keyof User,
    },
    {
      header: "Actions",
      accessor: "id" as keyof User,
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
            className="border rounded px-3 py-2 text-sm"
            readOnly
          />

          <Dropdown
            id="status-id"
            options={statusOptions}
            value={selectedStatuses}
            onChange={(val) =>
              setSelectedStatuses(Array.isArray(val) ? val : [val])
            }
            multiple={true}
            placeholder="Select status"
            isSearch={false}
          />

          <div className="w-48">
            <Dropdown
              id="contact-id"
              options={contactOptions}
              value={selectedContacts}
              onChange={(val) =>
                setSelectedContacts(Array.isArray(val) ? val : [val])
              }
              multiple={true}
              placeholder="Select contacts"
            />
          </div>
        </div>
        <button className="p-1 rounded hover:bg-gray-100">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
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
