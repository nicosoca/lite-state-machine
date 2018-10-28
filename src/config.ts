import { EdgeData, LSMContext, StateData } from './dtos';
import { LSMachine } from './machine';

export interface LSMConfig {
  name: string;
  initialState: string;
  events: string[];
  states: {
    [stateKey: string]: {
      stateData?: StateData;
      edges?: {
        [edgeKey: string]: {
          edgeData?: EdgeData;
          event: string;
          target: string;
          condition?: (context?: LSMContext) => boolean;
          action?: (machine: LSMachine, context?: LSMContext) => {};
        };
      };
    };
  };
}
