'use client';
import providers from '@/app/actions/getProviders';
import {
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Stack,
  Button,
  CardActionArea,
  CardActions,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import timeHelpers from '@/app/helpers/time';

export default function MakeAppointment() {
  const allProviders = providers.getAllProviders();
  const [date, setDate] = useState(dayjs(new Date()));
  const [selectedProvider, setSelectedProvider] = useState(allProviders[0]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');

  const handleSelect = (event) => {
    const providerId = event.target.value;
    const provider = providers.getProviderById(providerId);
    if (provider) {
      setSelectedProvider(provider);
    } else {
      console.error('Provider not found');
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const appointment = {
      provider: selectedProvider,
      date: date.format('LLLL'),
      time: selectedSlot,
    };
    console.log(appointment);

    // send off to endpoint to update appointments on specific provider
    // useRouter to navigate back to client-specific dashboard, where this appointment will be displayed
    // from there the timer will start, if 30 minutes passes this appt will be deleted
  };

  useEffect(() => {
    if (selectedProvider) {
      const day = dayjs(date).format('dddd').toLowerCase();

      const selectedDay = selectedProvider.availability.defaultWeek.find(
        (schedule) => schedule.day === day
      );

      if (!selectedDay.available) {
        setAvailableSlots([]);
      } else {
        const dayStart = selectedDay.start;
        const dayEnd = selectedDay.end;

        const slots = timeHelpers.TIME_SLOTS.slice(
          timeHelpers.TIME_SLOTS.indexOf(dayStart),
          timeHelpers.TIME_SLOTS.indexOf(dayEnd)
        );

        const now = dayjs(new Date());
        const nowWithTime = dayjs()
          .set('hour', now.hour())
          .set('minute', now.minute());

        let filteredSlots = slots.filter((slot) => {
          const selectedDateWithTime = dayjs(date)
            .set('hour', slot.split(':')[0])
            .set('minute', slot.split(':')[1]);
          return selectedDateWithTime.diff(nowWithTime, 'day', true) > 1;
        });

        if (selectedProvider.appointments) {
          // check if there are any appointments for this day
          // then compare the time and remove the slot if it's taken
          selectedProvider.appointments.forEach((appointment) => {
            const apptDayjs = dayjs(appointment.day)
              .set('hour', appointment.time.split(':')[0])
              .set('minute', appointment.time.split(':')[1]);

            if (dayjs(date).isSame(apptDayjs, 'day')) {
              const hour = apptDayjs.get('hour');
              const min = apptDayjs.get('minute');
              filteredSlots = filteredSlots.filter((slot) => {
                return slot !== `${hour}:${min}0`; // daysjs removes trailing '0'?? :expressionless:
              });
            }
          });
        }

        setAvailableSlots(filteredSlots);
      }
    }
  }, [date]);

  if (!allProviders) return <CircularProgress />;

  return (
    <>
      <Card variant='outlined'>
        <CardContent>
          <Typography variant='h6' component='h3' sx={{ mb: 2 }}>
            Choose your Provider
          </Typography>

          <Box component='form' onSubmit={handleSave}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id='provider-select'>Provider</InputLabel>
              <Select
                labelId='provider-select'
                id='demo-simple-select'
                value={selectedProvider.id}
                label='Provider'
                onChange={handleSelect}
              >
                {allProviders.map((provider: Provider) => {
                  return (
                    <MenuItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <Typography variant='h6' component='h3' sx={{ mb: 1 }}>
              Choose a date
            </Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar value={date} onChange={(val) => setDate(val)} />
            </LocalizationProvider>

            <Typography variant='h6' component='h3' sx={{ mb: 1 }}>
              Choose a time
            </Typography>

            <Box>
              {availableSlots.length === 0 ? (
                <Typography variant='body1'>
                  No available time slots for this day
                </Typography>
              ) : (
                <FormControl>
                  <RadioGroup
                    defaultValue={availableSlots[0]}
                    name='available-time-slots'
                  >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      {availableSlots.map((slot, idx) => {
                        return (
                          <FormControlLabel
                            key={idx}
                            value={slot}
                            control={<Radio />}
                            label={timeHelpers.getDisplayTime(slot)}
                            onChange={() => setSelectedSlot(slot)}
                            sx={{ flexBasis: '40%' }}
                          />
                        );
                      })}
                    </Box>
                  </RadioGroup>
                </FormControl>
              )}
            </Box>

            <CardActions>
              <Button
                variant='contained'
                sx={{ mt: 2 }}
                type='submit'
                fullWidth
              >
                Book Appointment
              </Button>
            </CardActions>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
