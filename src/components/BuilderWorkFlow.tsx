import React, { useState, useEffect } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { General_Texts } from "../services/constants/StringConstants";
import type { RootState } from "../redux/store";
import {
  ActionNode,
  AssignContactNode,
  TriggerNode,
  WaitNode,
  type NodeData,
} from "./WorkFlowBuilderNodes";
import { useSelector } from "react-redux";

// Custom Node Component

// Node types registration
const nodeTypes = {
  trigger: (props: any) => <TriggerNode {...props} />,
  action: (props: any) => <ActionNode {...props} />,
  wait: (props: any) => <WaitNode {...props} />,
  assigncontact: (props: any) => <AssignContactNode {...props} />,
};

/**
 * Props for BuilderWorkFlowComponent
 * @typedef {Object} BuilderProps
 * @property {() => void} onClick - Handler for node click events (e.g., opening sidebars or modals).
 */
interface BuilderProps {
  onClick: () => void;
}

/**
 * BuilderWorkFlowComponent
 *
 * Main workflow builder component. Renders a flowchart of workflow steps (trigger, actions, waits, assign-contact) using ReactFlow.
 *
 * @param {BuilderProps} props - Component props.
 * @returns {JSX.Element}
 */
export const BuilderWorkFlowComponent: React.FC<BuilderProps> = ({
  onClick,
}) => {
  const workflow = useSelector((state: RootState) => state.workflow.workflow);
  const isTriggerCreated = useSelector(
    (state: RootState) => state.workflow.isTriggerCreated
  );
  const isWaitClicked = useSelector(
    (state: RootState) => state.workflow.isWaitClicked
  );
  const actions = useSelector(
    (state: RootState) => state.workflow.workflow.actions
  );
  const isActionNode = useSelector(
    (state: RootState) => state.workflow.isActionNode
  );
  const isAssignContactClicked = useSelector(
    (state: RootState) => state.workflow.isAssignContactClicked
  );
  const [nodes, setNodes] = useState<
    Array<{
      id: string;
      position: { x: number; y: number };
      data: NodeData;
      type: string;
      draggable: boolean;
    }>
  >([
    // Initial node: always the trigger node, centered horizontally
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
  const [edges, setEdges] = useState<
    { id: string; source: string; target: string; type?: string }[]
  >([]);

  // Update nodes and edges when workflow trigger or isTriggerCreated changes
  useEffect(() => {
    /**
     * Dynamic node and edge generation logic:
     * Always start with the trigger node. For each action in Redux, add a node (assign-contact, wait, or action) and connect with an edge.
     * Append draft nodes for waits, actions, or assign-contact if their respective flags are set. Nodes are vertically spaced, with extra spacing for assign-contact nodes.
     */
    const centerX = window.innerWidth / 2 - 140;
    const newNodes = [
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
    ];
    const newEdges = [];
    let prevNodeId = "1";
    let y = 220; // initial vertical offset after trigger
    const nodeGap = 75; // vertical gap between nodes
    const assignContactNodeGap = 140; // larger gap for assign_contact_to_user node

    if (isTriggerCreated) {
      // Always render all nodes from actions
      actions.forEach((action, idx) => {
        const nodeId = `${action.type}-${idx + 1}`;
        if (action.type === "assign_contact_to_user") {
          newNodes.push({
            id: nodeId,
            position: { x: centerX, y },
            data: {
              label: "Assign contact to user",
              onClick,
              workflow,
              assignCondition: action.config?.assign_condition,
              assignTo: action.config?.assign_to,
            } as NodeData,
            type: "assigncontact",
            draggable: false,
          });
          newEdges.push({
            id: `e${prevNodeId}-${nodeId}`,
            source: prevNodeId,
            target: nodeId,
          });
          prevNodeId = nodeId;
          y += assignContactNodeGap;
          return;
        }
        const nodeType = action.type === "wait" ? "wait" : "action";
        const nodeData: NodeData = {
          label: nodeType === "wait" ? "Wait Node" : "Action Node",
          onClick,
          workflow,
        };
        if (nodeType === "wait") {
          nodeData.waitValue = action.config?.duration?.value;
          nodeData.waitUnit = action.config?.duration?.unit;
        }
        newNodes.push({
          id: nodeId,
          position: { x: centerX, y },
          data: nodeData,
          type: nodeType,
          draggable: false,
        });
        newEdges.push({
          id: `e${prevNodeId}-${nodeId}`,
          source: prevNodeId,
          target: nodeId,
        });
        prevNodeId = nodeId;
        y += nodeGap;
      });
      // Append draft nodes at the end if needed
      if (isWaitClicked) {
        newNodes.push({
          id: `wait-draft`,
          position: { x: centerX, y },
          data: {
            label: "Wait Node",
            onClick,
            workflow,
          } as NodeData,
          type: "wait",
          draggable: false,
        });
        newEdges.push({
          id: `e${prevNodeId}-wait-draft`,
          source: prevNodeId,
          target: `wait-draft`,
        });
        prevNodeId = `wait-draft`;
        y += nodeGap;
      }
      if (!isActionNode) {
        newNodes.push({
          id: `action-draft`,
          position: { x: centerX, y },
          data: {
            label: "Action Node",
            onClick,
            workflow,
          } as NodeData,
          type: "action",
          draggable: false,
        });
        newEdges.push({
          id: `e${prevNodeId}-action-draft`,
          source: prevNodeId,
          target: `action-draft`,
        });
        prevNodeId = `action-draft`;
        y += nodeGap;
      }
      if (isAssignContactClicked) {
        newNodes.push({
          id: `assigncontact-draft`,
          position: { x: centerX, y },
          data: {
            label: "Assign contact to user",
            onClick,
            workflow,
          } as NodeData,
          type: "assigncontact",
          draggable: false,
        });
        newEdges.push({
          id: `e${prevNodeId}-assigncontact-draft`,
          source: prevNodeId,
          target: `assigncontact-draft`,
        });
      }
    }
    setNodes(newNodes);
    setEdges(newEdges);
  }, [
    workflow,
    workflow.trigger,
    isTriggerCreated,
    isWaitClicked,
    onClick,
    actions,
    isActionNode,
    isAssignContactClicked,
  ]);

  // Existing resize effect
  useEffect(() => {
    /**
     * Keeps the trigger node horizontally centered on window resize.
     */
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
      {/*
       ReactFlow renders the workflow graph.
       - nodes: Array of node objects (trigger, actions, waits, assign-contact)
       - edges: Array of edge objects connecting nodes
     */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        zoomOnScroll={true}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}
        panOnDrag={false}
        preventScrolling={true}
        minZoom={0.5}
        maxZoom={2}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
      >
        <Background />
        <Controls showZoom={false} />
      </ReactFlow>
    </div>
  );
};
