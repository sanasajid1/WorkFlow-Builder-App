import React from "react";
import { Dropdown } from "./Dropdown";
import { ButtonComponent } from "./Button";
import { Button_Texts } from "../../services/constants/StringConstants";

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
    <div className="bg-white rounded-[8px] border-borderGray300 border overflow-hidden">
      <table className="min-w-full">
        <thead>
          <tr className="border-b">
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-6 py-3 bg-borderGray50 text-left text-xs font-medium text-textGray900 tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
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
            ]}
            isCheckBox={false}
            className="w-4"
          />

          <ButtonComponent
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="text-[12px] text-textGray500 px-4 py-[7px] disabled:opacity-50 hover:bg-borderGray50 rounded"
          >
            {Button_Texts.Previous}
          </ButtonComponent>

          <div className="flex border-textGray500 items-center gap-[8px]">
            {[...Array(totalPages)].map((_, i) => (
              <ButtonComponent
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                className={`text-[12px] w-[24px] h-[24px] flex items-center justify-center rounded ${
                  currentPage === i + 1
                    ? "bg-borderGray50 text-textGray500"
                    : "text-textGray500 hover:bg-borderGray50"
                }`}
              >
                {i + 1}
              </ButtonComponent>
            ))}
          </div>

          <ButtonComponent
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="text-[12px] text-textGray500 px-4 py-[7px] disabled:opacity-50 hover:bg-borderGray50 rounded"
          >
            {Button_Texts.Next}
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default Table;
