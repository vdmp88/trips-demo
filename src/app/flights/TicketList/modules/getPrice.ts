import { FlightTrip } from '@/features/flights/flightSlice';

export const getPrice = (trip: FlightTrip) => {
  if (trip['@'] === 'OneWayFlightTrip') return trip.flightInfo.price;
  if (trip['@'] === 'RoundFlightTrip') return trip.price;
  return Infinity;
};
