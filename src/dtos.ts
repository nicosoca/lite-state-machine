export interface StateData {
  key: string;
}

export interface EdgeData {
  key: string;
}

export interface LSMAction {
  event: string;
  edge: EdgeData;
  target: StateData;
}

export type LSMContext = any;
