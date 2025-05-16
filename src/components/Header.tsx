// components/Header.tsx
import { useState } from "react";
import { ArrowLeftIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import { ButtonComponent } from "./Button";
import {
  Button_Texts,
  WorkFlow_Name,
} from "../services/constants/StringConstants";

export const Header: React.FC = () => {
  const [workflowName, setWorkflowName] = useState(WorkFlow_Name);
  const [isEditing, setIsEditing] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  return (
    <div className="flex w-full justify-between items-center px-4 py-2 border-b border-borderGray200 bg-white">
      {/* Left Back Section */}
      <div className="flex items-center">
        <ButtonComponent
          icon={<ArrowLeftIcon className="w-4 h-4" />}
          className="flex gap-4 items-center text-sm font-medium text-textGray900 rounded-g8 border-[1px] border-borderGray200 px-2 py-[6px]"
        >
          {Button_Texts.Back}
        </ButtonComponent>
      </div>

      {/* Center Editable Workflow name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {isEditing ? (
          <input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="focus:outline-none font-inter text-[16px] leading-[150%] text-base font-medium text-center"
          />
        ) : (
          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            <span className="text-base font-inter text-[16px] leading-[150%] font-medium">
              {workflowName}
            </span>
            <PencilIcon className="w-4 h-4 text-textGray500" />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ButtonComponent className="flex font-inter gap-4 items-center text-[13px] font-medium text-textGray900 rounded-md border-[1px] border-borderGray200 px-[6px] py-[2px]">
          {Button_Texts.Draft}
        </ButtonComponent>
        <div className="flex items-center gap-2">
          <Switch
            checked={isDraft}
            onChange={setIsDraft}
            className={`${
              isDraft ? "bg-backgroundBlue600" : "bg-borderGray200"
            } relative inline-flex h-[20px] w-[40px] items-center rounded-full transition`}
          >
            <span
              className={`${
                isDraft ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
        </div>
        <ButtonComponent className="flex bg-gradient-to-r from-backGroundLeft to-backGroundRight text-white font-inter gap-4 items-center text-[14px] font-medium rounded-g8 px-2 py-[6px]">
          {Button_Texts.Save}
        </ButtonComponent>
      </div>
    </div>
  );
};
