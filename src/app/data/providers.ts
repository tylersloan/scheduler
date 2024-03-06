const PROVIDERS_DB: Provider[] = [
  {
    id: 1,
    name: 'Dr. Tyler Sloan',
    email: 'ts@hm.com',
    availability: {
      defaultWeek: [
        { day: 'monday', start: '09:15', end: '17:15', available: true },
        { day: 'tuesday', start: '09:15', end: '17:30', available: true },
        { day: 'wednesday', start: '09:15', end: '23:15', available: true },
        { day: 'thursday', start: '09:15', end: '17:45', available: true },
        { day: 'friday', start: '09:15', end: '14:30', available: true },
        { day: 'saturday', available: false },
        { day: 'sunday', available: false },
      ],
      custom: [{ date: '2024-03-18', available: true }],
    },
    appointments: [
      { day: '2024-03-07', time: '10:00', confirmed: true, clientId: 1 },
      { day: '2024-03-18', time: '10:00', confirmed: false, clientId: 1 },
    ],
  },
  {
    id: 2,
    name: 'Dr. Allison Sloan',
    email: 'ts@hm.com',
    availability: {
      defaultWeek: [
        { day: 'monday', start: '10:00', end: '15:00', available: true },
        { day: 'tuesday', start:'09:00', end: '17:15', available: true },
        { day: 'wednesday', start:undefined, end: undefined, available: true },
        { day: 'thursday', start: '09:00', end: '17:30', available: true },
        { day: 'friday', start: '09:00', end: '17:45', available: true },
        { day: 'saturday', available: false },
        { day: 'sunday', available: false },
      ],
      custom: [{ date: '2024-03-18', available: true }],
    },
    appointments: [
      { day: '2024-03-06', time: '10:30', confirmed: true, clientId: 1 },
      { day: '2024-03-18', time: '10:30', confirmed: false, clientId: 1 },
    ],
  },
  {
    id: 3,
    name: 'Dr. Weekend Warrior',
    email: 'ww@hm.com',
    availability: {
      defaultWeek: [
        { day: 'monday', start: undefined, end: undefined, available: false },
        { day: 'tuesday', start: undefined, end: undefined, available: false },
        { day: 'wednesday', start: undefined, end: undefined, available: false },
        { day: 'thursday', start: undefined, end: undefined, available: false },
        { day: 'friday', start: undefined, end: undefined, available: false },
        { day: 'saturday', start: '07:00', end: '19:00', available: true },
        { day: 'sunday', start: '07:00', end: '19:00', available: true },
      ],
      custom: [],
    },
    appointments: [],
  },
];

export default PROVIDERS_DB;
