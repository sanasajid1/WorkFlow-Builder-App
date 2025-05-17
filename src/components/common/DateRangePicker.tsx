import React, { useState, useRef, useEffect } from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { ButtonComponent } from "./Button";
import { COLORS } from "../../services/constants/ColorConstants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";
import { format } from "date-fns";

/*custom datepicker component used in execution logs*/

interface DateRangePickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [startDate, endDate] = dateRange;
  const wrapperRef = useRef<HTMLDivElement>(null);

  //used to close the datepicker modal when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //this function takes the date and formats it to "yyyy-MM-dd"
  const handleChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      const formattedRange = `${format(update[0], "yyyy-MM-dd")} - ${format(
        update[1],
        "yyyy-MM-dd"
      )}`;
      onChange(formattedRange);
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <ButtonComponent
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 px-4 py-2 border border-borderGray300 rounded-lg bg-white text-sm hover:bg-borderGray50"
      >
        <CalendarIcon className="w-5 h-5" stroke={COLORS.TEXT_GRAY_500} />
        <span className="text-textGray900">{value}</span>
      </ButtonComponent>

      {isOpen && (
        <div className="absolute z-20 mt-1">
          <DatePicker
            selected={startDate}
            onChange={handleChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            monthsShown={1}
            showPopperArrow={false}
            calendarClassName="border border-borderGray200 rounded-lg shadow-lg"
            dayClassName={() => "text-sm"}
            wrapperClassName="!block"
          />
        </div>
      )}
    </div>
  );
};
