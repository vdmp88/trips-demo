import { differenceInMinutes, parse } from 'date-fns';

export type FlightDuration = {
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
};

export const getFlightDuration = ({
  departureDate,
  departureTime,
  arrivalDate,
  arrivalTime,
}: FlightDuration) => {
  const departureDateTimeStr = `${departureDate} ${departureTime}`;
  const arrivalDateTimeStr = `${arrivalDate} ${arrivalTime}`;

  const departure = parse(departureDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
  const arrival = parse(arrivalDateTimeStr, 'yyyy-MM-dd HH:mm', new Date());

  const durationInMinutes = differenceInMinutes(arrival, departure);
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  return { hours, minutes, durationInMinutes };
};
