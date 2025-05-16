import {
  Button_Texts,
  General_Texts,
} from "../services/constants/StringConstants";
import { ButtonComponent } from "./common/Button";
import { Dropdown } from "./common/Dropdown";
import LineDivider from "./common/LineDivider";
import TextInput from "./common/TextInput";
import PencilSquareIcon from "./customIcons/PencilSquareIcon";

import React, { useState } from "react";

type ContactCreatedSectionProps = {
  setSelectedTrigger?: (trigger: string | null) => void;
};

export const ContactCreatedSection: React.FC<ContactCreatedSectionProps> = ({
  setSelectedTrigger,
}) => {
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const eventOptions = [
    { label: "Onboarding call", value: "onboarding" },
    { label: "Demo call", value: "demo" },
    { label: "Strategy meeting", value: "strategy" },
    { label: "Discovery call", value: "discovery" },
  ];
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const statusOptions = [
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
    { label: "Lead", value: "lead" },
    { label: "Customer", value: "customer" },
  ];

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <PencilSquareIcon stroke="#64748b" fontSize={20} />
            {General_Texts.Contact_Created}
          </div>
          <ButtonComponent
            onClick={() => setSelectedTrigger && setSelectedTrigger(null)}
            className="text-textGray400 hover:text-backgroundBlue600 text-xl px-2"
          >
            ×
          </ButtonComponent>
        </div>
        <div className="text-sm text-textGray400 mb-4">
          {General_Texts.Set_Up_Trigger}
        </div>
        <TextInput placeholder="Add a description" />
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
      <ButtonComponent className="flex justify-center w-full bg-gradient-to-r from-backGroundLeft to-backGroundRight text-white gap-4 items-center text-[14px] font-medium rounded-g8 px-2 py-[6px]">
        {Button_Texts.Save}
      </ButtonComponent>
    </div>
  );
};

export default ContactCreatedSection;
