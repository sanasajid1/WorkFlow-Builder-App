import { useDispatch, useSelector } from "react-redux";
import {
  setTrigger,
  resetWorkflow,
  setIsTriggerCreated,
} from "../redux/features/workFlow/workFlowSlice";
import {
  Button_Texts,
  contactCreatedEventOptions,
  contactCreatedStatusOptions,
  General_Texts,
} from "../services/constants/StringConstants";
import { ButtonComponent } from "./common/Button";
import { Dropdown } from "./common/Dropdown";
import LineDivider from "./common/LineDivider";
import TextInput from "./common/TextInput";

import React, { useState, useEffect, useCallback } from "react";
import type { RootState } from "../redux/store";
import { COLORS } from "../services/constants/ColorConstants";
import { UserIcon } from "@heroicons/react/24/outline";

type ContactCreatedSectionProps = {
  setSelectedTrigger?: (trigger: string | null) => void;
  onShowActionView?: () => void;
};

export const ContactCreatedSection: React.FC<ContactCreatedSectionProps> = ({
  setSelectedTrigger,
  onShowActionView,
}) => {
  const dispatch = useDispatch();
  const workflow = useSelector((state: RootState) => state.workflow.workflow);

  // Local state for form values
  const [description, setDescription] = useState(
    workflow.trigger.description || ""
  );
  const [selectedStatus, setSelectedStatus] = useState<string>(
    workflow.trigger.filters.contact_statuses || ""
  );
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    workflow.trigger.filters.events || []
  );

  // Track if dropdowns are open
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);

  // Update trigger in Redux
  const updateTrigger = useCallback(() => {
    const newTrigger = {
      type: "contact_created",
      description: description,
      filters: {
        events: selectedEvents,
        contact_statuses: selectedStatus,
      },
    };
    dispatch(setTrigger(newTrigger));
  }, [description, selectedEvents, selectedStatus, dispatch]);

  // Handle description changes - update immediately
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    updateTrigger();
  };

  // Handle events changes - update only when dropdown closes
  const handleEventsChange = (val: string | string[]) => {
    const newEvents = Array.isArray(val) ? val : [val];
    setSelectedEvents(newEvents);
    if (!isEventsOpen) {
      updateTrigger();
    }
  };

  // Handle status changes - update only when dropdown closes
  const handleStatusChange = (val: string | string[]) => {
    setSelectedStatus(val as string);
    if (!isStatusOpen) {
      updateTrigger();
    }
  };

  const handleSave = () => {
    updateTrigger();
    if (onShowActionView) {
      onShowActionView();
    }
    dispatch(setIsTriggerCreated(true));
  };

  // Add isFormValid check
  const isFormValid =
    description.trim() !== "" &&
    selectedEvents.length > 0 &&
    selectedStatus !== "";

  // Update trigger when dropdowns close
  useEffect(() => {
    if (!isEventsOpen && selectedEvents.length > 0) {
      updateTrigger();
    }
  }, [isEventsOpen, selectedEvents, updateTrigger]);

  useEffect(() => {
    if (!isStatusOpen && selectedStatus) {
      updateTrigger();
    }
  }, [isStatusOpen, selectedStatus, updateTrigger]);

  const handleClose = () => {
    dispatch(resetWorkflow());
    if (setSelectedTrigger) {
      setSelectedTrigger(null);
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2 text-base font-semibold">
            <UserIcon stroke={COLORS.TEXT_GRAY_500} className="w-5 h-5" />
            {General_Texts.Contact_Created}
          </div>
          <ButtonComponent
            onClick={handleClose}
            className="text-textGray400 text-xl px-2"
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
          onChange={handleDescriptionChange}
        />

        <LineDivider className="my-4" />
        <div className="mb-2 text-xs font-medium text-textGray500">
          {General_Texts.Events}
        </div>
        <div className="mb-4">
          <Dropdown
            options={contactCreatedEventOptions}
            value={selectedEvents}
            onChange={handleEventsChange}
            multiple={true}
            placeholder="Select event"
            onOpenChange={setIsEventsOpen}
          />
        </div>
        <div className="mb-2 text-xs font-medium text-textGray500">
          {General_Texts.Contact_Status}
        </div>
        <div>
          <Dropdown
            options={contactCreatedStatusOptions}
            value={selectedStatus}
            onChange={handleStatusChange}
            placeholder="Select contact status"
            onOpenChange={setIsStatusOpen}
          />
        </div>
      </div>
      <ButtonComponent
        onClick={handleSave}
        disabled={!isFormValid}
        className={`flex justify-center w-full gap-4 items-center text-[14px] font-medium rounded-g8 px-2 py-[6px] text-white ${
          isFormValid ? "active-button-class" : "disabled-button-class"
        }`}
      >
        {Button_Texts.Save}
      </ButtonComponent>
    </div>
  );
};

export default ContactCreatedSection;
