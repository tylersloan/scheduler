interface ClientAppointment {
  day: string;
  time: string;
  confirmed: boolean;
  providerId: number;
}

interface Client {
  id: number;
  name: string;
  email: string;
  appointments: ClientAppointment[];
}