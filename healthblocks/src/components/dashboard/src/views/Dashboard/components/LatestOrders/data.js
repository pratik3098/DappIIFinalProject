import uuid from 'uuid/v1';

export default [
  {
    id: uuid(),
    ref: 'CDD1049',
    conAddress: "0xb13766f6cac5d0182e1c9335058a40b917d21dd4",
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    conAddress: "0xf3e1e822eFF1d4B5E7F9447d550cB667921AD72c",
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    conAddress: "0xa453b444a5353c0ae1ae09addc2aecc2427a9d06",
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    conAddress: "0xbe65072aae7ca8d43615d4caaeed8764f5208e61",
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    conAddress: "0xb13766f6cac5d0182e1c9335058a40b917d215e3",
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    conAddress: "0xce65072aae7ca8d43615d4caaeed8764f5208e73",
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];
