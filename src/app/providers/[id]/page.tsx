'use client';
import { Box, Typography } from '@mui/material';
import DayRow from './DayRow';
import providers from '@/app/actions/getProviders';

export default function Provider({ params }: { params: { id: string } }) {
  const provider: Provider | undefined = providers.getProviderById(params.id);

  if (!provider) {
    return <Typography>Provider not found</Typography>;
  }

  const handleSave = (event) => {
    // something like providers.updateProvider(providerId, eventData);
  };

  return (
    <div>
      <Typography variant='h5' component='h1' sx={{ mb: 3 }}>
        {provider.name} | <small>Availability</small>
      </Typography>
      <Box>
        {provider.availability.defaultWeek.map((day) => {
          return <DayRow day={day} key={day.day} handleSave={handleSave} />;
        })}
      </Box>
    </div>
  );
}
