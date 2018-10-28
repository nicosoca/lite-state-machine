import { EdgeData, SSMContext, StateData } from './dtos';
import { SSMachine } from './machine';

export interface SSMConfig {
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
          condition?: (context?: SSMContext) => boolean;
          action?: (machine: SSMachine, context?: SSMContext) => {};
        };
      };
    };
  };
}
