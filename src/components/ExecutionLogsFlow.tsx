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
import { DateRangePicker } from "./common/DateRangePicker";
import { parse, isWithinInterval } from "date-fns";

const ExecutionLogsComponent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [dateRange, setDateRange] = useState("Select Date Range");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleResetFilters = () => {
    setSelectedStatuses([]);
    setSelectedContacts([]);
    setDateRange("Select Date Range");
    setCurrentPage(1);
  };

  const contactOptions: DropdownOption[] = useMemo(() => {
    return workflowData.workflow.users.map((user) => ({
      label: user.name,
      value: user.name,
    }));
  }, []);

  const parseExecutionDate = (dateStr: string) => {
    // Input format: "May 21st 2025, 6:27:05"
    const [datePart] = dateStr.split(",");
    const [month, day, year] = datePart.split(" ");

    // Remove ordinal indicators (st, nd, rd, th)
    const cleanDay = day.replace(/(st|nd|rd|th)/, "");

    // Reconstruct date string in a format that Date can parse
    const parsableDate = `${month} ${cleanDay} ${year}`;
    return new Date(parsableDate);
  };

  const filteredData = useMemo(() => {
    let filtered = [...workflowData.workflow.users];

    // Filter by status
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((user) =>
        selectedStatuses.includes(user.status)
      );
    }

    // Filter by contacts
    if (selectedContacts.length > 0) {
      filtered = filtered.filter((user) =>
        selectedContacts.includes(user.name)
      );
    }

    // Filter by date range using the format yyyy-MM-dd
    const [startDateStr, endDateStr] = dateRange.split(" - ");

    if (startDateStr && endDateStr) {
      try {
        const startDate = parse(startDateStr.trim(), "yyyy-MM-dd", new Date());
        const endDate = parse(endDateStr.trim(), "yyyy-MM-dd", new Date());

        filtered = filtered.filter((user) => {
          const executionDate = parseExecutionDate(user.executedOn);
          return isWithinInterval(executionDate, {
            start: startDate,
            end: endDate,
          });
        });
      } catch (error) {
        console.error("Error parsing dates:", error);
      }
    }

    return filtered;
  }, [selectedStatuses, selectedContacts, dateRange]);

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
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            className="w-[250px] filter-options"
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
            className="rounded-lg filter-options"
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
              className="rounded-lg filter-options"
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
            onClick={handleResetFilters}
            className="rounded-g8 border-[1px] hover:bg-borderGray50 border-borderGray300 p-2"
          />
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
