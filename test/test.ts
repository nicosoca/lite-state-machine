import { LSMachine } from '../src';

const config = {
  name: 'LSM1',
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
          condition: (context) => {
            return context && context.to2;
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

// create the state machine from config
const lsm = new LSMachine(config);

// register optional error callback
lsm.onEventError((event, machine, context) => {
  console.log(`Error in machine ${lsm.getName()} in throwed event ${event} with context ${context}`);
});

// { key: 'STATE1' }
console.log(lsm.currentSatate());

// [ { event: 'e1', target: { key: 'STATE2' }, edge: { key: 'EDGE1' } } ]
console.log(lsm.possibleActions());

// throw event 'e1' with context { to2: false } (EDGE1 condition fails!)
lsm.throwEvent('e1', { to2: false });

// { key: 'STATE2' }
console.log(lsm.currentSatate());

// [ { event: 'e2', target: { key: 'STATE3' }, edge: { key: 'EDGE3' } },
//   { event: 'e3', target: { key: 'STATE3' }, edge: { key: 'EDGE4' } } ]
console.log(lsm.possibleActions());

// throw event 'e2'
lsm.throwEvent('e2');

// { key: 'STATE3' }
console.log(lsm.currentSatate());