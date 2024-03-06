'use client';
import clients from '@/app/actions/getClients';
import providers from '@/app/actions/getProviders';
import timeHelpers from '@/app/helpers/time';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Link as MuiLink,
  Icon,
} from '@mui/material';

export default function Client({ params }: { params: { id: string } }) {
  const client: Client | undefined = clients.getClientById(params.id);
  console.log('client: ', client);

  if (!client) {
    return <Typography>Client not found</Typography>;
  }

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography variant='h5' component='h1' sx={{ mb: 3 }}>
          {client.name}
        </Typography>
        <Card variant='outlined'>
          <CardContent>
            <Stack
              direction='row'
              spacing={2}
              justifyContent='space-between'
              mb={4}
            >
              <h2>Appointments</h2>
              <Button
                variant='contained'
                component={Link}
                href={`/clients/${client.id}/make-appointment`}
              >
                Add Appointment
              </Button>
            </Stack>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Confirmed?</TableCell>
                  <TableCell>Provider</TableCell>
                  <TableCell>Date & Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {client.appointments.map((appointment) => {
                  const provider = providers.getProviderById(
                    appointment.providerId
                  );
                  const date = new Date(appointment.day).toDateString();
                  return (
                    <TableRow key={appointment.day}>
                      <TableCell>
                        {appointment.confirmed ? (
                          '✅'
                        ) : (
                          <Button
                            variant='outlined'
                            color='primary'
                            size='small'
                            sx={{ display: 'block' }}
                          >
                            Confirm Now
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>{provider?.name ?? 'Unknown'}</TableCell>
                      <TableCell>
                        {date} - {timeHelpers.getDisplayTime(appointment.time)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
