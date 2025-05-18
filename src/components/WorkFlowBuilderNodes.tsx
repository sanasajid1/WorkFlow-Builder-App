import { Handle, Position } from "@xyflow/react";
import type { Workflow } from "../redux/types/workflowModel";
import {
  Button_Texts,
  General_Texts,
} from "../services/constants/StringConstants";
import {
  ClockIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { ButtonComponent } from "./common/Button";
import LineDivider from "./common/LineDivider";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

/**
 * NodeData interface defines the shape of data passed to each node in the ReactFlow graph.
 * @property {string} label - The label to display on the node.
 * @property {() => void} onClick - Click handler for node actions.
 * @property {Workflow} workflow - The workflow object from Redux.
 * @property {string | number} [waitValue] - Optional wait duration value for wait nodes.
 * @property {string} [waitUnit] - Optional wait duration unit for wait nodes.
 */

export interface NodeData extends Record<string, unknown> {
  label: string;
  onClick: () => void;
  workflow: Workflow;
  waitValue?: string | number;
  waitUnit?: string;
}

/**
 * TriggerNode component
 * Renders the trigger node UI, showing trigger details and filters if present.
 * Highlights the node if a trigger is created, and disables click if so.
 */
export const TriggerNode = ({ data }: { data: NodeData }) => {
  const workflowData = data.workflow.trigger;
  // Show divider if any filter or description is present
  const showLineDivider =
    workflowData.description ||
    workflowData.filters.events?.length > 0 ||
    workflowData.filters.contact_statuses !== "";

  const isTriggerCreated = useSelector(
    (state: RootState) => state.workflow.isTriggerCreated
  );

  return (
    <div
      // Only allow click if trigger is not created
      onClick={isTriggerCreated ? undefined : data.onClick}
      className={`bg-white rounded-lg w-[370px] ${
        data.label === General_Texts.Contact_Created
          ? "border-[2px] border-textBlue400"
          : "border border-borderGray300"
      } p-[12px]`}
    >
      {/* Source handle for connecting to next node */}
      <Handle type="source" position={Position.Bottom} />
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex justify-center items-center">
            {/* Icon changes based on trigger type */}
            {data.label === General_Texts.Contact_Created ? (
              <UserIcon className="w-[14px] h-[14px] rounded-full text-backgroundBlue600 bg-backgroundBlue50" />
            ) : (
              <PlusIcon className="w-[14px] h-[14px] text-textGray400" />
            )}
            <span
              className={`${
                data.label === General_Texts.Contact_Created
                  ? "text-textGray900"
                  : "text-textGray400"
              }  text-sm ml-2 font-medium`}
            >
              {data.label}
            </span>
          </div>
          <div className="flex justify-center items-center">
            {/* Trigger label and menu icon */}
            <ButtonComponent className="flex ml-10 gap-4 items-center text-[13px] font-medium text-textGray900 rounded-md border-[1px] border-borderGray200 bg-borderGray100 px-[6px] py-[2px]">
              {Button_Texts.Trigger}
            </ButtonComponent>
            <EllipsisVerticalIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Divider if filters or description exist */}
      {showLineDivider && <LineDivider className="my-4" />}

      {/* Show events filter if present */}
      {workflowData.filters.events?.length > 0 && (
        <div className="flex">
          <div className="text-xs font-medium text-textGray500 mb-2 mr-2">
            {General_Texts.Events}:
          </div>
          <div className="text-xs font-medium text-textGray900">
            {workflowData.filters.events.join(", ")}
          </div>
        </div>
      )}

      {/* Show contact status filter if present */}
      {workflowData.filters.contact_statuses !== "" && (
        <div className="flex">
          <div className="text-xs font-medium text-textGray500 mb-2 mr-2">
            {General_Texts.Contact_Status}:
          </div>
          <div className="text-xs font-medium text-textGray900">
            {workflowData.filters.contact_statuses}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * ActionNode component
 * Renders a generic action node. Click is only enabled if a trigger is created.
 */
export const ActionNode = ({ data }: { data: any }) => {
  const isTriggerCreated = useSelector(
    (state: RootState) => state.workflow.isTriggerCreated
  );

  return (
    <div
      className="border-2 border-textBlue400 bg-white rounded-[8px] w-[370px] gap-2 px-4 py-2 flex items-center justify-center shadow-sm"
      // Only allow click if trigger is created
      onClick={isTriggerCreated ? data.onClick : undefined}
      style={{ cursor: isTriggerCreated ? "pointer" : "default" }}
    >
      {/* Handles for connecting to previous/next nodes */}
      <Handle type="target" position={Position.Top} />
      <PlusIcon className="w-4 h-4" />
      <span className="text-[15px] font-medium">Action</span>
    </div>
  );
};

/**
 * WaitNode component
 * Renders a wait node, showing wait duration if provided.
 */
export const WaitNode = ({ data }: { data: any }) => (
  <div className="border-2 border-borderGray300 bg-white rounded-[8px] w-[370px] gap-2 px-4 py-2 flex items-center justify-center shadow-sm">
    {/* Handles for connecting to previous/next nodes */}
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <ClockIcon className="w-5 h-5 text-borderPurple600" />
    <span className="text-[15px] font-medium ">
      {/* Show wait duration if available */}
      {data.waitValue && data.waitUnit
        ? `Wait for ${data.waitValue} ${data.waitUnit}`
        : "Wait"}
    </span>
  </div>
);

/**
 * AssignContactNode component
 * Renders a node for assigning contacts to users. Shows assignment details if provided.
 */
export const AssignContactNode = ({ data }: { data: any }) => (
  <div className="border-2 border-borderGray300 bg-white rounded-[8px] w-[370px] px-4 py-2 flex flex-col shadow-sm">
    {/* Handles for connecting to previous/next nodes */}
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <div className="flex items-center gap-2">
      <UserIcon className="w-4 h-4 text-borderPurple600" />
      <span className="text-[15px] font-medium">Assign contact to user</span>
      <EllipsisVerticalIcon className="w-4 h-4 text-borderGray300 ml-auto" />
    </div>
    {/* Show assignment details if available */}
    {data.assignCondition && data.assignTo ? (
      <>
        <div className="border-t border-borderGray200 my-2" />
        <div className="text-xs text-textGray500">
          Assign condition:{" "}
          <span className="font-semibold text-textGray900">
            {data.assignCondition === "only_if_not_assigned"
              ? "Only if not assigned"
              : "Overwrite existing assigned users"}
          </span>
        </div>
        <div className="text-xs text-textGray500">
          Assign to:{" "}
          <span className="font-semibold text-textGray900">
            {Array.isArray(data.assignTo?.users)
              ? `${data.assignTo.users.length} user(s) selected`
              : ""}
          </span>
        </div>
        <div className="text-xs text-textGray500">
          Assign percentage:{" "}
          <span className="font-semibold text-textGray900">
            {data.assignTo?.distribution === "manual"
              ? "Assign manually"
              : "Assign equally"}
          </span>
        </div>
      </>
    ) : null}
  </div>
);
