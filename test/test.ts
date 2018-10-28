import { SSMConfig } from '../src/config';
import { SSMachine } from '../src/machine';
import { SSMContext } from '../src/dtos';

const config: SSMConfig = {
  name: 'SSM1',
  initialState: 'STATE1',
  events: ['e1', 'e2', 'e3'],
  states: {
    STATE1: {
      edges: {
        EDGE1: {
          event: 'e1',
          target: 'STATE2',
        },
      },
    },
    STATE2: {
      edges: {
        EDGE2: {
          event: 'e2',
          target: 'STATE1',
          condition: (context?: SSMContext) => {
            return context && context.tomar2;
          },
        },
        EDGE3: {
          event: 'e2',
          target: 'STATE3',
        },
        EDGE4: {
          event: 'e3',
          target: 'STATE3',
        },
      },
    },
    STATE3: {},
  },
};

// STATE1 -> STATE1 -> STATE2 -> STATE1 -> STATE2 -> STATE3
// const ssm1 = new SSMachine(config);
// ssm1.onEventError((event, machine, context) => {
//   console.log(`Error en la máquina ${ssm1.getName()} al disparar el evento ${event} con el contexto ${context}`);
// });
// console.log(ssm1.currentSatate().key);
//
// ssm1.throwEvent('invalido');
// console.log(ssm1.currentSatate().key);
//
// ssm1.throwEvent('e1');
// console.log(ssm1.currentSatate().key);
//
// ssm1.throwEvent('e2', { tomar2: true });
// console.log(ssm1.currentSatate().key);
//
// ssm1.throwEvent('e1');
// console.log(ssm1.currentSatate().key);
//
// ssm1.throwEvent('e2', { tomar2: false });
// console.log(ssm1.currentSatate().key);

//----------------------------------------------------------------------------------------------------------------//

const ssm2 = new SSMachine(config);
ssm2.onEventError((event, machine, context) => {
  console.log(`Error en la máquina ${ssm2.getName()} al disparar el evento ${event} con el contexto ${context}`);
});
console.log(ssm2.currentSatate().key);
console.log(ssm2.possibleActions());

ssm2.throwEvent('e1');
console.log(ssm2.currentSatate().key);
console.log(ssm2.possibleActions());

ssm2.throwEvent('e2');
console.log(ssm2.currentSatate().key);
console.log(ssm2.possibleActions());
