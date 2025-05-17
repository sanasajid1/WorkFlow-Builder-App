import React, { useState } from "react";
import { ButtonComponent } from "./common/Button";

interface WaitActionConfigViewProps {
  onClose: () => void;
}

const timeUnits = ["Minutes", "Hours", "Days", "Weeks"];

const WaitActionConfigView: React.FC<WaitActionConfigViewProps> = ({
  onClose,
}) => {
  const [step, setStep] = useState<"main" | "period">("main");
  const [waitValue, setWaitValue] = useState(10);
  const [waitUnit, setWaitUnit] = useState("Minutes");

  return (
    <div className="flex flex-col h-full p-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          <h2 className="text-lg font-semibold">Wait</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M4.93 4.93a10 10 0 1 1-1.41 1.41" />
              <path d="M12 2v6h6" />
            </svg>
          </button>
          <ButtonComponent
            onClick={onClose}
            className="text-textGray400 hover:text-backgroundBlue600 text-xl px-2"
          >
            ×
          </ButtonComponent>
        </div>
      </div>
      {/* Subtitle */}
      <div className="text-sm text-gray-500 mb-4">Configure your action</div>
      {/* Main or Period UI */}
      {step === "main" ? (
        <div className="flex flex-col gap-3">
          <button
            className="flex items-center w-full px-3 py-3 border border-gray-200 rounded-md text-left text-sm gap-2 hover:bg-gray-50"
            onClick={() => setStep("period")}
          >
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            A set period of time
          </button>
          <button className="flex items-center w-full px-3 py-3 border border-gray-200 rounded-md text-left text-sm gap-2 hover:bg-gray-50">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            Until a specific day and/or time
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Back */}
          <button
            className="flex items-center text-sm text-backgroundBlue600 mb-2 gap-1"
            onClick={() => setStep("main")}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back
          </button>
          <div className="font-medium mb-2">A set period of time</div>
          <div className="mb-2 text-sm text-gray-700">Wait for</div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              min={1}
              value={waitValue}
              onChange={(e) => setWaitValue(Number(e.target.value))}
              className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-100 text-sm"
            />
            <select
              value={waitUnit}
              onChange={(e) => setWaitUnit(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
            >
              {timeUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* Footer */}
      <div className="flex justify-end gap-2 py-4 mt-auto">
        <ButtonComponent
          onClick={onClose}
          className="px-4 py-2 rounded border border-borderGray300 text-textGray500 bg-white"
        >
          Cancel
        </ButtonComponent>
        <ButtonComponent
          onClick={() => {}}
          className="px-4 py-2 rounded border text-white bg-backgroundBlue600"
        >
          Save
        </ButtonComponent>
      </div>
    </div>
  );
};

export default WaitActionConfigView;
