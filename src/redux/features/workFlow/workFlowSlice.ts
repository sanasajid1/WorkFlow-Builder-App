import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  WorkflowState,
  Trigger,
  Action,
  TriggerFilters,
} from "../../types/workflowModel";

const initialState: WorkflowState = {
  workflow: {
    name: "WorkFlow Name",
    status: "Draft",
    trigger: {
      type: "",
      description: "",
      filters: {
        events: [],
        contact_statuses: "",
      },
    },
    actions: [],
  },
  loading: false,
  isTriggerCreated: false,
  isWaitClicked: false,
  isAssignContactClicked: false,
  isActionNode: false,
  error: null,
};

const workflowSlice = createSlice({
  name: "workflow",
  initialState,
  reducers: {
    setWorkflowName: (state, action: PayloadAction<string>) => {
      state.workflow.name = action.payload;
    },
    setWorkflowStatus: (state, action: PayloadAction<string>) => {
      state.workflow.status = action.payload;
    },
    setTrigger: (state, action: PayloadAction<Trigger>) => {
      state.workflow.trigger = action.payload;
    },
    setIsTriggerCreated: (state, action: PayloadAction<boolean>) => {
      state.isTriggerCreated = action.payload;
    },
    updateTriggerFilters: (state, action: PayloadAction<TriggerFilters>) => {
      state.workflow.trigger.filters = action.payload;
    },
    setIsActionNode: (state, action: PayloadAction<boolean>) => {
      state.isActionNode = action.payload;
    },
    setIsWaitClicked: (state, action: PayloadAction<boolean>) => {
      state.isWaitClicked = action.payload;
    },
    setIsAssignContactClicked: (state, action: PayloadAction<boolean>) => {
      state.isAssignContactClicked = action.payload;
    },
    addAction: (state, action: PayloadAction<Action>) => {
      state.workflow.actions.push(action.payload);
    },
    updateAction: (
      state,
      action: PayloadAction<{ index: number; action: Action }>
    ) => {
      const { index, action: updatedAction } = action.payload;
      state.workflow.actions[index] = updatedAction;
    },
    removeAction: (state, action: PayloadAction<number>) => {
      state.workflow.actions.splice(action.payload, 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetWorkflow: (state) => {
      state.workflow = initialState.workflow;
      state.error = null;
    },
  },
});

export const {
  setWorkflowName,
  setWorkflowStatus,
  setTrigger,
  setIsTriggerCreated,
  updateTriggerFilters,
  addAction,
  setIsActionNode,
  setIsWaitClicked,
  setIsAssignContactClicked,
  updateAction,
  removeAction,
  setLoading,
  setError,
  resetWorkflow,
} = workflowSlice.actions;

export default workflowSlice.reducer;
