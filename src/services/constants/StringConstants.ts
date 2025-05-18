import type { DropdownOption } from "../../components/common/Dropdown";
import ListDetailsIcon from "../../components/customIcons/ListDetailsIcon";
import { COLORS } from "./ColorConstants";
import {
  UserIcon,
  PhoneIcon,
  CheckIcon,
  CalendarIcon,
  ClockIcon,
  ArrowPathIcon,
  CogIcon,
} from "@heroicons/react/24/outline";

export const WorkFlow_Name = "WorkFlow Name";

export const Button_Texts = {
  Save: "Save",
  Draft: "Draft",
  Live: "Live",
  Back: "Back",
  Cancel: "Cancel",
  Trigger: "Trigger",
  Next: "Next",
  Previous: "Previous",
};

export const Tab_Panel_Texts = {
  Builder: "Builder",
  Execution_Log: "Execution log",
};

export const General_Texts = {
  Select_Trigger_SideBar: "Select a trigger in the Sidebar",
  Select_Trigger: "Select a trigger",
  No_Options: "No Options",
  Set_Up_Trigger: "Set up your trigger",
  Events: "Event(s)",
  Contact_Created: " Contact created",
  Contact_Status: "Contact status",
  Close_Menu: "Close menu",
  Define_The_Trigger: "Define the trigger that kicks off this workflow.",
  Execution_Logs_Description:
    "View a history and details of all executions performed by this Workflow",
};

export const SideBar_Tabs = {
  All: "All",
  Contact: "Contact",
  Call: "Call",
  Outcome: "Outcome",
  Appointment: "Appointment",
};

export const assignContactConditionOptions = [
  { value: "onlyifnotassigned", label: "Only if not assigned" },
  {
    value: "overwriteexistingassignedusers",
    label: "Overwrite existing assigned users",
  },
];

export const assignContactUserOptions = [
  { value: "allusers", label: "All users" },
  { value: "specificusers", label: "Specific users" },
];

export const contactCreatedEventOptions = [
  { label: "Onboarding call", value: "Onboarding call" },
  { label: "Demo call", value: "Demo call" },
  { label: "Strategy meeting", value: "Strategy meeting" },
  { label: "Discovery call", value: "Discovery call" },
];

export const contactCreatedStatusOptions = [
  { label: "Potential", value: "Potential" },
  { label: "Qualified", value: "Qualified" },
  { label: "Disqualified", value: "Disqualified" },
  { label: "Strategy Call Booked", value: "Strategy Call Booked" },
  { label: "Discovery Call Booked", value: "Discovery Call Booked" },
];

export const waitActionTimeUnits = [
  { value: "Minutes", label: "Minutes" },
  { value: "Hours", label: "Hours" },
  { value: "Days", label: "Days" },
];

export const actionTabs = [
  { name: "All", icon: ListDetailsIcon },
  { name: "Contact", icon: UserIcon },
  { name: "Call", icon: PhoneIcon },
  { name: "Appointment setting", icon: CalendarIcon },
  { name: "Utilities", icon: ClockIcon },
];

export const actionTabContent = [
  // All tab
  {
    heading: "APPOINTMENT SETTING",
    items: [
      {
        label: "Assign contact to user",
        view: "assignContact",
      },
      { label: "Remove assigned user" },
    ],
    utilitiesHeading: "UTILITIES",
    utilities: [
      { label: "If/Else condition" },
      { label: "Wait", view: "wait" },
      { label: "Go to" },
      { label: "Webhook" },
      { label: "Math operation" },
    ],
    icon: {
      component: UserIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
    utilitiesIcon: {
      component: ClockIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Contact tab
  {
    heading: "CONTACT",
    items: [],
    utilitiesHeading: null,
    utilities: [],
    icon: {
      component: UserIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Call tab
  {
    heading: "CALL",
    items: [],
    utilitiesHeading: null,
    utilities: [],
    icon: {
      component: PhoneIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Appointment setting tab
  {
    heading: "APPOINTMENT SETTING",
    items: [
      {
        label: "Assign contact to user",
        view: "assignContact",
        icon: UserIcon,
      },
      {
        label: "Remove assigned user",
        view: "removeAssignedUser",
        icon: UserIcon,
      },
    ],
    utilitiesHeading: null,
    utilities: [],
    icon: {
      component: CalendarIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Utilities tab
  {
    heading: "UTILITIES",
    items: [
      { label: "If/Else condition", view: "ifElse", icon: ArrowPathIcon },
      { label: "Wait", view: "wait", icon: ClockIcon },
      { label: "Go to", view: "goTo", icon: ArrowPathIcon },
      { label: "Webhook", view: "webhook", icon: CogIcon },
      { label: "Math operation", view: "mathOperation", icon: CogIcon },
    ],
    utilitiesHeading: null,
    utilities: [],
    icon: {
      component: CogIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
];

export const executionLogsStatusOptions: DropdownOption[] = [
  { label: "Error", value: "Error" },
  { label: "Finished", value: "Finished" },
];

export const triggerTabs = [
  SideBar_Tabs.All,
  SideBar_Tabs.Contact,
  SideBar_Tabs.Call,
  SideBar_Tabs.Outcome,
  SideBar_Tabs.Appointment,
];

export const triggerTabContent = [
  // All tab
  {
    heading: SideBar_Tabs.All,
    items: ["Contact created"],
    icon: {
      component: UserIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Contact tab
  {
    heading: SideBar_Tabs.Contact,
    items: ["Contact created"],
    icon: {
      component: UserIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Call tab
  {
    heading: SideBar_Tabs.Call,
    items: [],
    icon: {
      component: PhoneIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Outcome tab
  {
    heading: SideBar_Tabs.Outcome,
    items: [],
    icon: {
      component: CheckIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
  // Appointment tab
  {
    heading: SideBar_Tabs.Appointment,
    items: [],
    icon: {
      component: CalendarIcon,
      props: {
        stroke: COLORS.TEXT_GRAY_500,
        className: "w-4 h-4",
      },
    },
  },
];
