'use client';
import { Box, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import AllHoursSelect from '@/app/components/base/AllHoursSelect';

export default function DayRow({ day }: { day: Schedule }) {
  const [availability, setAvailability] = useState(day.available);

  return (
    <Box mb={4} key={day.day}>
      <Box>
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' sx={{ textTransform: 'capitalize' }}>
            {day.day}
          </Typography>
        </Box>
      </Box>
      <Box display='flex' alignItems='center' marginLeft='auto'>
        <Switch
          checked={availability}
          onChange={() => setAvailability((prev) => !prev)}
          aria-label={`${day.day} availability`}
          sx={{ mr: 2 }}
        />
        <AllHoursSelect day={{ ...day, available: availability }} />
      </Box>
    </Box>
  );
}
