import React, { useEffect, useState } from "react";
import { ButtonComponent } from "./common/Button";
import { Dropdown } from "./common/Dropdown";
import { ArrowPathIcon, UserIcon } from "@heroicons/react/24/outline";
import { COLORS } from "../services/constants/ColorConstants";
import TextInput from "./common/TextInput";
import { useDispatch } from "react-redux";
import { addAction } from "../redux/features/workFlow/workFlowSlice";
import workflowData from "../data/workflow.json";
import {
  assignContactConditionOptions,
  assignContactUserOptions,
  Button_Texts,
} from "../services/constants/StringConstants";

interface AssignContactToUserConfigViewProps {
  onClose: () => void;
}

const AssignContactToUserConfigView: React.FC<
  AssignContactToUserConfigViewProps
> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [assignCondition, setAssignCondition] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [assignPercentage, setAssignPercentage] = useState("");
  const [userPercentages, setUserPercentages] = useState<{
    [userId: string]: string;
  }>({});
  const [percentageError, setPercentageError] = useState("");

  const sumPercentages = selectedUsers.reduce(
    (sum, userId) => sum + (parseInt(userPercentages[userId] || "0", 10) || 0),
    0
  );
  const isManual =
    assignTo === "specificusers" && assignPercentage === "manually";
  const isSaveDisabled =
    !assignCondition ||
    !assignTo ||
    (assignTo === "specificusers" && selectedUsers.length === 0) ||
    (isManual && sumPercentages !== 100);

  useEffect(() => {
    if (assignPercentage === "manually" && selectedUsers.length > 0) {
      const equal = (100 / selectedUsers.length).toFixed(0);
      setUserPercentages(
        Object.fromEntries(selectedUsers.map((id) => [id, equal]))
      );
    }
  }, [selectedUsers, assignPercentage]);

  const handlePercentageChange = (userId: string, value: string) => {
    setUserPercentages((prev) => ({
      ...prev,
      [userId]: value.replace(/[^\d]/g, ""),
    }));
  };

  const handleSave = () => {
    if (isManual && sumPercentages > 100) {
      setPercentageError("Total percentage cannot be greater than 100.");
      return;
    }
    setPercentageError("");

    // Build action object
    const action = {
      type: "assign_contact_to_user",
      config: {
        assign_condition:
          assignCondition === "onlyifnotassigned"
            ? "only_if_not_assigned"
            : "overwrite_existing_assigned_users",
        assign_to:
          assignTo === "specificusers"
            ? {
                type: "specific_users",
                users: selectedUsers.map((id) => {
                  const user = workflowData.workflow.users.find(
                    (u) => u.id === id
                  );
                  return {
                    id: user?.username || id,
                    name: user?.name || id,
                    percentage: isManual
                      ? String(parseInt(userPercentages[id] || "0", 10))
                      : String(Math.floor(100 / selectedUsers.length)),
                  };
                }),
                distribution:
                  assignPercentage === "manually" ? "manual" : "equal",
              }
            : {
                type: "all_users",
                users: workflowData.workflow.users.map((user) => ({
                  id: user.username,
                  name: user.name,
                  percentage: "0",
                })),
                distribution: "equal",
              },
      },
    };
    dispatch(addAction(action));
    onClose();
  };

  return (
    <div className="flex flex-col h-full p-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <UserIcon stroke={COLORS.TEXT_GRAY_500} className="w-4 h-4" />
          <h2 className="text-lg font-semibold">Assign contact to user</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-600">
            <ArrowPathIcon className="w-5 h-5" />
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
      {/* Form */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-sm font-medium mb-1">Assign condition</div>
          <Dropdown
            options={assignContactConditionOptions}
            value={assignCondition}
            onChange={(value) => setAssignCondition(value as string)}
            placeholder="Select condition"
            isCheckBox={false}
          />
        </div>
        <div>
          <div className="text-sm font-medium mb-1">Assign to</div>
          <Dropdown
            options={assignContactUserOptions}
            value={assignTo}
            onChange={(value) => setAssignTo(value as string)}
            placeholder="Select"
            isCheckBox={false}
          />
        </div>
        {assignTo === "specificusers" && (
          <div>
            <div className="text-sm font-medium mb-1">Select user(s)</div>
            <Dropdown
              options={workflowData.workflow.users.map((user) => ({
                value: user.id,
                label: (
                  <span className="flex items-center">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="font-medium mr-1">{user.name}</span>
                    <span className="text-textGray400">@{user.username}</span>
                  </span>
                ),
              }))}
              value={selectedUsers}
              onChange={(val) =>
                setSelectedUsers(Array.isArray(val) ? val : [val])
              }
              multiple={true}
              placeholder="Select"
            />
            {percentageError && (
              <div className="text-xs text-red-500 mt-2">{percentageError}</div>
            )}
            {selectedUsers.length > 0 && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-1">
                  Assign percentage
                </div>
                <Dropdown
                  options={[
                    { value: "equally", label: "Assign equally" },
                    { value: "manually", label: "Assign manually" },
                  ]}
                  value={assignPercentage}
                  onChange={(value) => setAssignPercentage(value as string)}
                  placeholder="Select"
                  isCheckBox={false}
                />
                {assignPercentage === "manually" && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm font-semibold text-textGray500 mb-2">
                      <span>User</span>
                      <span>Percentage</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      {selectedUsers.map((userId) => {
                        const user = workflowData.workflow.users.find(
                          (u) => u.id === userId
                        );
                        if (!user) return null;
                        return (
                          <div
                            key={user.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-6 h-6 rounded-full mr-2"
                              />
                              <span className="text-sm">{user.name}</span>
                            </div>
                            <TextInput
                              type="number"
                              value={userPercentages[user.id] || ""}
                              onChange={(e) =>
                                handlePercentageChange(user.id, e.target.value)
                              }
                              className="w-12 py-1 border border-borderGray200 rounded text-sm text-center"
                              suffix="%"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Footer */}
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

export default AssignContactToUserConfigView;
