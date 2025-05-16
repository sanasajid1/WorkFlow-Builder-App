import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface NodeData {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: any;
}

interface WorkflowState {
  nodes: NodeData[];
}

const initialState: WorkflowState = {
  nodes: [],
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<NodeData>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<NodeData>) => {
      const index = state.nodes.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) state.nodes[index] = action.payload;
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNode, updateNode, deleteNode } = workflowSlice.actions;
export default workflowSlice.reducer;
