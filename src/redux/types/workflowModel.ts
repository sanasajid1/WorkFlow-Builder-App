export interface Filter {
  field: string;
  operator: string;
  value: string;
}

export interface NodeParams {
  filters?: Filter[];
  workflow_name?: string;
  target?: string;
  destination?: string;
}

export interface Node {
  name: string;
  type: string;
  params: NodeParams;
}

export interface Duration {
  value: number;
  unit: string;
}

export interface User {
  id: string;
  name: string;
  percentage: string;
}

export interface AssignTo {
  type: string;
  users: User[];
  distribution: string;
}

export interface ActionConfig {
  mode?: string;
  duration?: Duration;
  assign_condition?: string;
  assign_to?: AssignTo;
}

export interface Action {
  type: string;
  config: ActionConfig;
}

export interface TriggerFilters {
  events: string[];
  contact_statuses: string[];
}

export interface Trigger {
  type: string;
  description: string;
  filters: TriggerFilters;
}

export interface Workflow {
  name: string;
  status: string;
  trigger: Trigger;
  actions: Action[];
}

export interface WorkflowState {
  workflow: Workflow;
  loading: boolean;
  error: string | null;
}
