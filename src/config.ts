import { LSMContext } from './dtos';
import { LSMachine } from './machine';

export interface LSMConfig {
  name: string;
  initialState: string;
  events: string[];
  states: {
    [stateKey: string]: {
      stateData?: any;
      edges?: {
        [edgeKey: string]: {
          edgeData?: any;
          event: string;
          target: string;
          condition?: (context?: LSMContext) => boolean;
          action?: (machine: LSMachine, context?: LSMContext) => {};
        };
      };
    };
  };
}
