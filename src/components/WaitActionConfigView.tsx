import React, { useState } from "react";
import { ButtonComponent } from "./common/Button";
import {
  ArrowPathIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import TextInput from "./common/TextInput";
import { Dropdown } from "./common/Dropdown";
import { addAction } from "../redux/features/workFlow/workFlowSlice";
import { useDispatch } from "react-redux";
import {
  Button_Texts,
  waitActionTimeUnits,
} from "../services/constants/StringConstants";
import LineDivider from "./common/LineDivider";

//this component handles the entire workflow of wait in action

interface WaitActionConfigViewProps {
  onClose: () => void;
}

const WaitActionConfigView: React.FC<WaitActionConfigViewProps> = ({
  onClose,
}) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<"main" | "period">("main");
  const [waitValue, setWaitValue] = useState("");
  const [waitUnit, setWaitUnit] = useState("Minutes");

  const handleSave = () => {
    const waitAction = {
      type: "wait",
      config: {
        mode: "duration",
        duration: {
          value: parseInt(waitValue) || 0,
          unit: waitUnit,
        },
      },
    };
    dispatch(addAction(waitAction));
    onClose();
  };

  const isSaveDisabled = !waitValue || !waitUnit;

  return (
    <div className="flex flex-col h-full p-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-textGray500" />
          <span className="text-base font-medium">Wait</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-textGray500 hover:text-textGray500">
            <ArrowPathIcon className="w-4 h-4" />
          </button>
          <ButtonComponent
            onClick={onClose}
            className="text-textGray500 hover:text-textGray500 text-xl px-2"
          >
            ×
          </ButtonComponent>
        </div>
      </div>
      {/* Subtitle */}
      <div className="text-sm text--textGray500 mb-4">
        Configure your action
      </div>
      <LineDivider className="w-full mb-4" />
      {/* Main or Period UI */}
      {step === "main" ? (
        <div className="flex flex-col gap-3">
          <ButtonComponent
            className="flex text-base text-textGray900 font-medium items-center w-full px-3 py-3 border border-borderGray200 rounded-md text-left text-sm gap-2 hover:borderGray50"
            onClick={() => setStep("period")}
          >
            <ClockIcon className="w-5 h-5 text-textGray500" />A set period of
            time
          </ButtonComponent>
          <ButtonComponent className="flex  text-base text-textGray900 font-medium items-center w-full px-3 py-3 border border-borderGray200 rounded-md text-left text-sm gap-2 hover:borderGray50">
            <CalendarIcon className="w-5 h-5 text-textGray500" />
            Until a specific day and/or time
          </ButtonComponent>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Back */}
          <ButtonComponent
            className="flex items-center text-sm mb-2 gap-1"
            onClick={() => setStep("main")}
          >
            <ChevronLeftIcon className="w-4 h-4text-textGray500" />
            {Button_Texts.Back}
          </ButtonComponent>
          <div className=" text-base text-textGray700 font-medium mb-2">
            A set period of time
          </div>
          <div className="mb-2 text-sm text-textGray700">Wait for</div>
          <div className="flex items-center gap-2 mb-4">
            <TextInput
              type="number"
              value={waitValue.toString()}
              onChange={(e) => setWaitValue(e.target.value)}
              className="px-2 py-2 border border-borderGray300 rounded-lg text-sm focus:outline-none focus:ring-none w-[48px]"
            />
            <Dropdown
              value={waitUnit}
              onChange={(value) => setWaitUnit(value as string)}
              options={waitActionTimeUnits}
              isCheckBox={false}
              className="w-32 filter-options rounded-lg"
            />
          </div>
        </div>
      )}
      <div className="flex justify-end gap-2 py-4 mt-auto">
        <ButtonComponent
          onClick={onClose}
          className="flex items-center gap-4 px-2 py-[6px] text-[14px] font-medium rounded-g8 border border-borderGray300 bg-white text-textGray900"
        >
          {Button_Texts.Cancel}
        </ButtonComponent>
        <ButtonComponent
          onClick={handleSave}
          disabled={isSaveDisabled}
          className={`flex items-center gap-4 px-2 py-[6px] text-[14px] font-medium rounded-g8 text-white ${
            isSaveDisabled ? "disabled-button-class" : "active-button-class"
          }`}
        >
          {Button_Texts.Save}
        </ButtonComponent>
      </div>
    </div>
  );
};

export default WaitActionConfigView;
