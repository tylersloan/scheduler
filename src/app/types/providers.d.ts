interface Appointment {
  day: string;
  time: string;
  confirmed: boolean;
  clientId: number;
}

interface Schedule {
  day: string;
  start?: string;
  end?: string;
  available: boolean;
}

interface Provider {
  id: number;
  name: string;
  email: string;
  availability: {
    defaultWeek: Schedule[];
    custom: { date: string; available: boolean }[];
  };
  appointments: Appointment[];
}