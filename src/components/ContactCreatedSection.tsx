import { useDispatch, useSelector } from "react-redux";
import {
  setTrigger,
  resetWorkflow,
} from "../redux/features/workFlow/workFlowSlice";
import {
  Button_Texts,
  General_Texts,
} from "../services/constants/StringConstants";
import { ButtonComponent } from "./common/Button";
import { Dropdown } from "./common/Dropdown";
import LineDivider from "./common/LineDivider";
import TextInput from "./common/TextInput";

import React, { useState } from "react";
import type { RootState } from "../redux/store";
import { COLORS } from "../services/constants/ColorConstants";
import { UserIcon } from "@heroicons/react/24/outline";

type ContactCreatedSectionProps = {
  setSelectedTrigger?: (trigger: string | null) => void;
};

export const ContactCreatedSection: React.FC<ContactCreatedSectionProps> = ({
  setSelectedTrigger,
}) => {
  const dispatch = useDispatch();
  const workflow = useSelector((state: RootState) => state.workflow.workflow);
  const [description, setDescription] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const eventOptions = [
    { label: "Onboarding call", value: "onboarding" },
    { label: "Demo call", value: "demo" },
    { label: "Strategy meeting", value: "strategy" },
    { label: "Discovery call", value: "discovery" },
  ];
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Lead", value: "lead" },
    { label: "Customer", value: "customer" },
  ];

  const handleSave = () => {
    const newTrigger = {
      type: "contact_created",
      description: description,
      filters: {
        events: selectedEvents,
        contact_statuses: [selectedStatus],
      },
    };

    dispatch(setTrigger(newTrigger));
    console.log("Current Workflow State:", workflow);
    console.log("New Trigger Added:", newTrigger);
    if (setSelectedTrigger) {
      setSelectedTrigger(null);
    }
  };

  const handleClose = () => {
    dispatch(resetWorkflow());
    if (setSelectedTrigger) {
      setSelectedTrigger(null);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <UserIcon stroke={COLORS.TEXT_GRAY_500} className="w-5 h-5" />
            {General_Texts.Contact_Created}
          </div>
          <ButtonComponent
            onClick={handleClose}
            className="text-textGray400 hover:text-backgroundBlue600 text-xl px-2"
          >
            ×
          </ButtonComponent>
        </div>
        <div className="text-sm text-textGray400 mb-4">
          {General_Texts.Set_Up_Trigger}
        </div>
        <TextInput
          placeholder="Add a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <LineDivider className="my-4" />
        <div className="mb-2 text-xs font-medium text-textGray500">
          {General_Texts.Events}
        </div>
        <div className="mb-4">
          <Dropdown
            options={eventOptions}
            value={selectedEvents}
            onChange={(val) =>
              setSelectedEvents(Array.isArray(val) ? val : [val])
            }
            multiple={true}
            placeholder="Select event"
          />
        </div>
        <div className="mb-2 text-xs font-medium text-textGray500">
          {General_Texts.Contact_Status}
        </div>
        <div>
          <Dropdown
            options={statusOptions}
            value={selectedStatus}
            onChange={(val) =>
              setSelectedStatus(Array.isArray(val) ? val[0] ?? "" : val)
            }
            placeholder="Select contact status"
          />
        </div>
      </div>
      <ButtonComponent
        onClick={handleSave}
        className="flex justify-center w-full bg-gradient-to-r from-backGroundLeft to-backGroundRight text-white gap-4 items-center text-[14px] font-medium rounded-g8 px-2 py-[6px]"
      >
        {Button_Texts.Save}
      </ButtonComponent>
    </div>
  );
};

export default ContactCreatedSection;
