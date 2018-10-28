export interface StateData {
  key: string;
}

export interface EdgeData {
  key: string;
}

export interface SSMAction {
  event: string;
  edge: EdgeData;
  target: StateData;
}

export type SSMContext = any;
