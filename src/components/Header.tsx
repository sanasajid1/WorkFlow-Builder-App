// components/Header.tsx
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Switch } from "@headlessui/react";
import { ButtonComponent } from "./common/Button";
import {
  Button_Texts,
  WorkFlow_Name,
} from "../services/constants/StringConstants";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

import { useDispatch, useSelector } from "react-redux";
import {
  setWorkflowName,
  setWorkflowStatus,
} from "../redux/features/workFlow/workFlowSlice";
import type { RootState } from "../redux/store";

export const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isTriggerCreated = useSelector(
    (state: RootState) => state.workflow.isTriggerCreated
  );
  const actions = useSelector(
    (state: RootState) => state.workflow.workflow.actions
  );

  const workflow = useSelector((state: RootState) => state.workflow);

  // Check if workflow is valid (has trigger and at least one action)
  const isWorkflowValid = isTriggerCreated && actions.length > 0;

  const workflowName =
    useSelector((state: RootState) => state.workflow.workflow.name) ||
    WorkFlow_Name;
  const [isEditing, setIsEditing] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setWorkflowName(e.target.value));
  };

  const handleSave = () => {
    console.log("Full Redux state:", workflow.workflow);
  };

  const handleToggle = (checked: boolean) => {
    setIsDraft(!isDraft);
    dispatch(setWorkflowStatus(checked ? "Live" : "Draft"));
  };

  return (
    <div className="flex w-full justify-between items-center px-4 py-2 border-b border-borderGray200 bg-white">
      {/* Left Back Section */}
      <div className="flex items-center">
        <ButtonComponent
          icon={<ChevronLeftIcon className="w-4 h-4 text-textGray500" />}
          className="flex gap-1 items-center text-sm font-medium text-textGray900 rounded-g8 border-[1px] border-borderGray200 px-2 py-[6px]"
        >
          {Button_Texts.Back}
        </ButtonComponent>
      </div>

      {/* Center Editable Workflow name */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {isEditing ? (
          <input
            value={workflowName}
            onChange={handleNameChange}
            onBlur={() => setIsEditing(false)}
            autoFocus
            className="focus:outline-none text-[16px] leading-[150%] text-base font-medium text-center"
          />
        ) : (
          <div
            className="cursor-pointer flex items-center gap-1"
            onClick={() => setIsEditing(true)}
          >
            <span className="text-base text-[16px] leading-[150%] font-medium">
              {workflowName}
            </span>
            <PencilIcon className="w-4 h-4 text-textGray500" />
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <ButtonComponent
          className={`flex gap-4 items-center text-[13px] font-medium ${
            !isDraft
              ? "text-textGray900 border-borderGray200 bg-borderGray100"
              : "text-textGreen600 border-borderGreen300 bg-backgroundGreen100"
          }  rounded-md border-[1px] px-[6px] py-[2px]`}
        >
          {!isDraft ? Button_Texts.Draft : Button_Texts.Live}
        </ButtonComponent>
        <div className="flex items-center gap-2">
          <Switch
            checked={isDraft}
            onChange={handleToggle}
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
        <ButtonComponent
          className={`flex items-center gap-4 px-2 py-[6px] text-[14px] font-medium rounded-g8 text-white ${
            isWorkflowValid ? "active-button-class" : "disabled-button-class"
          }`}
          disabled={!isWorkflowValid}
          onClick={handleSave}
        >
          {Button_Texts.Save}
        </ButtonComponent>
      </div>
    </div>
  );
};
