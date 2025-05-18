import React from "react";
import { Dropdown } from "./Dropdown";
import { ButtonComponent } from "./Button";
import { Button_Texts } from "../../services/constants/StringConstants";

//custom Table component with pagination implemented

interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (itemsPerPage: number) => void;
}

const Table = <T extends Record<string, any>>({
  data,
  columns,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: TableProps<T>) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="bg-white rounded-[8px] border-borderGray300 border">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-borderGray50 rounded-[8px] text-left text-xs font-medium text-textGray900"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-borderGray200">
          {currentData.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {column.render
                    ? column.render(item[column.accessor], item)
                    : item[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-borderGray200">
        <div className="flex items-center text-[12px] text-textGray500">
          Showing {(currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[12px] text-textGray500">Rows per page:</span>
          <Dropdown
            value={itemsPerPage.toString()}
            onChange={(value) => onItemsPerPageChange(Number(value))}
            options={[
              { label: "5", value: "5" },
              { label: "10", value: "10" },
              { label: "15", value: "15" },
              { label: "20", value: "20" },
            ]}
            isCheckBox={false}
            className="w-18 rounded-[8px]"
          />

          <div className="flex border border-borderGray200 rounded-[8px] overflow-hidden">
            <ButtonComponent
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="text-[14px] text-textGray900 px-2 py-[7px] disabled:opacity-50 bg-white border-none shadow-none rounded-none focus:outline-none"
            >
              {Button_Texts.Previous}
            </ButtonComponent>
            {[...Array(totalPages)].map((_, i) => (
              <ButtonComponent
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`text-[14px] px-2 py-[7px] bg-white border-l shadow-none rounded-none focus:outline-none ${
                  currentPage === i + 1
                    ? "font-semibold text-textGray900"
                    : "text-textGray900"
                }`}
              >
                {i + 1}
              </ButtonComponent>
            ))}
            <ButtonComponent
              onClick={() =>
                onPageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="text-[14px] text-textGray900 px-2 py-[7px] disabled:opacity-50 bg-white border-l shadow-none rounded-none focus:outline-none"
            >
              {Button_Texts.Next}
            </ButtonComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
