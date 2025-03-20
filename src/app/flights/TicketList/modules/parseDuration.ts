import { FlightInfo } from '@/features/flights/flightSlice';
import { differenceInMinutes, parseISO } from 'date-fns';

export const parseDuration = (flight: FlightInfo) => {
  const departure = parseISO(`${flight.departureDate}T${flight.departureTime}`);
  const arrival = parseISO(`${flight.arrivalDate}T${flight.arrivalTime}`);
  return differenceInMinutes(arrival, departure);
};
