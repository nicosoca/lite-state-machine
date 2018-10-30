export interface StateData {
  key: string;
  payload?: any;
}

export interface EdgeData {
  key: string;
  payload?: any;
}

export interface LSMAction {
  event: string;
  edge: EdgeData;
  target: StateData;
}

export type LSMContext = any;
