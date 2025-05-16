import React, { useState, useEffect } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { PlusIcon } from "@heroicons/react/24/outline";
import { ButtonComponent } from "./common/Button";
import {
  Button_Texts,
  General_Texts,
} from "../services/constants/StringConstants";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

interface NodeData {
  label: string;
  onClick: () => void;
}

// Custom Node Component
const TriggerNode = ({ data }: { data: NodeData }) => {
  return (
    <div
      onClick={data.onClick}
      className="flex items-center gap-2 bg-white rounded-lg border border-borderGray300 p-[12px]"
    >
      <PlusIcon className="w-[14px] h-[14px] text-textGray400" />
      <span className="text-textGray400 text-sm font-medium">{data.label}</span>
      <ButtonComponent className="flex gap-4 items-center text-[13px] font-medium text-textGray900 rounded-md border-[1px] border-borderGray200 bg-borderGray100 px-[6px] py-[2px]">
        {Button_Texts.Trigger}
      </ButtonComponent>
      <EllipsisVerticalIcon className="w-4 h-4" />
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
  const [nodes, setNodes] = useState([
    {
      id: "1",
      position: { x: 0, y: 50 },
      data: { label: General_Texts.Select_Trigger_SideBar, onClick },
      type: "trigger",
      draggable: false,
    },
  ]);

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
    <div className="h-screen">
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        className="bg-backgroundBlue600"
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
