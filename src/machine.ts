import { EdgeData, LSMAction, LSMContext, StateData } from './dtos';
import { LSMConfig } from './config';

export class LSMachine {
  private config: LSMConfig;
  private currentStateKey: string;
  private eventErrorListener: (event: string, machine: LSMachine, context: LSMContext) => void;

  constructor(config: LSMConfig) {
    // TODO validar config y clonarla
    this.config = config;
    this.currentStateKey = config.initialState;
  }

  currentState(): StateData {
    return this.getStateData(this.currentStateKey);
  }

  getName(): string {
    return this.config.name;
  }

  possibleActions(context?: LSMContext): LSMAction[] {
    const ret: LSMAction[] = [];
    const currentState = this.config.states[this.currentStateKey];
    if (currentState.edges) {
      for (const key of Object.keys(currentState.edges)) {
        const edge = currentState.edges[key];
        const edgeCondition = edge.condition;
        if (!edgeCondition || edgeCondition(context)) {
          ret.push({
            event: edge.event,
            target: this.getStateData(edge.target),
            edge: this.getEdgeData(this.currentStateKey, key),
          });
        }
      }
    }
    return ret;
  }

  throwEvent(event: string, context?: LSMContext): EdgeData {
    try {
      const currentState = this.config.states[this.currentStateKey];
      if (currentState.edges) {
        for (const key of Object.keys(currentState.edges)) {
          const edge = currentState.edges[key];
          if (edge.event === event) {
            let conditionOk = true;
            if (edge.condition) {
              conditionOk = edge.condition(context);
            }
            if (conditionOk) {
              // ejecuto la accion
              if (edge.action) {
                edge.action(this, context);
              }
              const previousState = this.currentStateKey;
              // cambio de estado
              this.currentStateKey = edge.target;
              // termino de procesar retornando la data de la arista tomada
              return this.getEdgeData(previousState, key);
            }
          }
        }
      }
    } catch (error) {
      if (this.eventErrorListener) {
        this.eventErrorListener(event, this, context);
      }
    }
    return null;
  }

  finalize(finalState: string) {
    if (this.config.finalStates.indexOf(finalState) !== -1) {
      this.currentStateKey = finalState;
    } else {
      if (this.eventErrorListener) {
        this.eventErrorListener('reserved.finalizate', this, null);
      }
    }
  }

  onEventError(listener: (event: string, machine: LSMachine, context: LSMContext) => void) {
    this.eventErrorListener = listener;
  }

  private getStateData(key: string): StateData {
    const currentState = this.config.states[key];
    const ret: StateData = { key };
    if (currentState.stateData) {
      ret.payload = currentState.stateData;
    }
    return ret;
  }

  private getEdgeData(stateKey: string, edgeKey: string): EdgeData {
    const edge = this.config.states[stateKey].edges[edgeKey];
    const ret: EdgeData = { key: edgeKey };
    if (edge.edgeData) {
      ret.payload = edge.edgeData;
    }
    return ret;
  }
}
