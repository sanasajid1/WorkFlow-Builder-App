import React, { useState, useEffect } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PlusIcon, UserIcon } from "@heroicons/react/24/outline";
import { ButtonComponent } from "./common/Button";
import {
  Button_Texts,
  General_Texts,
} from "../services/constants/StringConstants";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import type { Workflow } from "../redux/types/workflowModel";
import LineDivider from "./common/LineDivider";

//builder flow component using React Flow to map trigger an action nodes

interface NodeData {
  label: string;
  onClick: () => void;
  workflow: Workflow;
}

// Custom Node Component
const TriggerNode = ({ data }: { data: NodeData }) => {
  const workflowData = data.workflow.trigger;
  const showLineDivider =
    workflowData.filters.events?.length > 0 ||
    workflowData.filters.contact_statuses !== "";

  return (
    <div
      onClick={data.onClick}
      className={`bg-white rounded-lg ${
        data.label === General_Texts.Contact_Created
          ? "border-[2px] border-textBlue400"
          : "border border-borderGray300"
      } p-[12px]`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center">
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
          <ButtonComponent className="flex ml-10 gap-4 items-center text-[13px] font-medium text-textGray900 rounded-md border-[1px] border-borderGray200 bg-borderGray100 px-[6px] py-[2px]">
            {Button_Texts.Trigger}
          </ButtonComponent>
          <EllipsisVerticalIcon className="w-4 h-4" />
        </div>
      </div>

      {showLineDivider && <LineDivider className="my-4" />}

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

// Node types registration
const nodeTypes = {
  trigger: TriggerNode,
};

interface BuilderProps {
  onClick: () => void;
}

export const BuilderWorkFlowComponent: React.FC<BuilderProps> = ({
  onClick,
}) => {
  const workflow = useSelector((state: RootState) => state.workflow.workflow);
  const [nodes, setNodes] = useState([
    {
      id: "1",
      position: { x: 0, y: 50 },
      data: {
        label:
          workflow.trigger.type === "contact_created"
            ? General_Texts.Contact_Created
            : General_Texts.Select_Trigger_SideBar,
        onClick,
        workflow,
      },
      type: "trigger",
      draggable: false,
    },
  ]);

  // Update nodes when workflow trigger changes
  useEffect(() => {
    const centerX = window.innerWidth / 2 - 140;
    setNodes([
      {
        id: "1",
        position: { x: centerX, y: 50 },
        data: {
          label:
            workflow.trigger.type === "contact_created"
              ? General_Texts.Contact_Created
              : General_Texts.Select_Trigger_SideBar,
          onClick,
          workflow,
        },
        type: "trigger",
        draggable: false,
      },
    ]);
  }, [workflow, workflow.trigger, onClick]);

  // Existing resize effect
  useEffect(() => {
    const updateNodePosition = () => {
      const centerX = window.innerWidth / 2 - 140;
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === "1" ? { ...node, position: { x: centerX, y: 50 } } : node
        )
      );
    };

    updateNodePosition();
    window.addEventListener("resize", updateNodePosition);
    return () => window.removeEventListener("resize", updateNodePosition);
  }, []);

  return (
    <div className="h-[calc(100vh-112px)]">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        panOnDrag={false}
        preventScrolling={true}
        minZoom={1}
        maxZoom={1}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        <Controls showZoom={false} />
      </ReactFlow>
    </div>
  );
};
