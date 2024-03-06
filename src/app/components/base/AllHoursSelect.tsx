'use client';
import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '@mui/material';
import timeHelpers from '@/app/helpers/time';

export default function AllHoursSelect({ day }: { day: Schedule }) {
  const [startTime, setStartTime] = useState(day.start ?? undefined);
  const [endTime, setEndTime] = useState(day.end ?? undefined);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);
  const clearErrors = () => {
    setStartError(false);
    setEndError(false);
  };

  const handleStart = (event: SelectChangeEvent<typeof startTime>) => {
    clearErrors();
    const time = event.target.value;

    if (time && endTime && time > endTime) {
      // setEndTime(time);
      setStartError(true);
    }
    setStartTime(time);
  };

  const handleEnd = (event: SelectChangeEvent<typeof endTime>) => {
    clearErrors();
    const time = event.target.value;
    if (time && startTime && time < startTime) {
      setEndError(true);
    }
    setEndTime(time);
  };

  return (
    <>
      <FormControl sx={{ width: '12em' }}>
        <InputLabel id='hour-select-label'>Start Time</InputLabel>
        <Select
          error={startError}
          disabled={!day.available}
          labelId='hour-select-label'
          id='hour-select'
          label='Start Time'
          value={startTime}
          onChange={handleStart}
        >
          {timeHelpers.TIME_SLOTS.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {timeHelpers.getDisplayTime(hour)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Typography sx={{ mx: 2 }} variant='caption'>
        to
      </Typography>
      <FormControl sx={{ width: '12em' }}>
        <InputLabel id='hour-select-label'>End Time</InputLabel>
        <Select
          error={endError}
          disabled={!day.available}
          labelId='hour-select-label'
          id='hour-select'
          label='End Time'
          value={endTime}
          onChange={handleEnd}
        >
          {hours.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {timeHelpers.getDisplayTime(hour)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
