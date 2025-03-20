import { parseDuration } from '@/app/flights/TicketList/modules/parseDuration';
import { FlightTrip } from '@/features/flights/flightSlice';

export const getDuration = (trip: FlightTrip) => {
  if (trip['@'] === 'OneWayFlightTrip') {
    return parseDuration(trip.flightInfo);
  }
  if (trip['@'] === 'RoundFlightTrip') {
    return (
      parseDuration(trip.flightInfo) + parseDuration(trip.returnFlightInfo)
    );
  }
  return Infinity;
};
