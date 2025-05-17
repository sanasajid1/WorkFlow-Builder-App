export interface User {
  id: number;
  name: string;
  action: string;
  status: string;
  executedOn: string;
}

export interface WorkflowData {
  users: User[];
}
