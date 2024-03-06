import clients from '@/app/actions/getClients';
import providers from '@/app/actions/getProviders';
import {
  Box,
  Card,
  CardHeader,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';

export default async function Home() {
  const allProviders = await providers.getAllProviders();
  const allClients = await clients.getAllClients();

  return (
    <Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant='h4' component='h1'>
          Users Dashboard
        </Typography>
        <Typography variant='subtitle1'>
          Click a user, provider or client, to effectively "assume" that user
          and use the app as them
        </Typography>
      </Box>
      <Card sx={{ mb: 4 }}>
        <CardHeader title='Providers' />
        <ul>
          {allProviders.data.map((provider: { id: string; name: string }) => (
            <MuiLink
              href={`/providers/${provider.id}`}
              key={provider.id}
              component={Link}
            >
              <li key={provider.id}>{provider.name}</li>
            </MuiLink>
          ))}
        </ul>
      </Card>
      <Card>
        <CardHeader title='Clients' />
        <ul>
          {allClients.data.map((client: { id: string; name: string }) => (
            <MuiLink
              href={`/clients/${client.id}`}
              key={client.id}
              component={Link}
            >
              <li key={client.id}>{client.name}</li>
            </MuiLink>
          ))}
        </ul>
      </Card>
    </Box>
  );
}
