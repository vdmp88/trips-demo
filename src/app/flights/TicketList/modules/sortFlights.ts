import { getDuration } from '@/app/flights/TicketList/modules/getDuration';
import { getPrice } from '@/app/flights/TicketList/modules/getPrice';
import { FlightTrip, SortOption } from '@/features/flights/flightSlice';

export const sortFlights = (flights: FlightTrip[], sortOption: SortOption) => {
  const sortedFlights = [...flights].sort((a, b) => {
    if (sortOption === SortOption.CHEAPEST) {
      return getPrice(a) - getPrice(b);
    }

    if (sortOption === SortOption.FASTEST) {
      const durationA = getDuration(a);
      const durationB = getDuration(b);

      if (durationA === durationB) {
        return getPrice(a) - getPrice(b);
      }

      return durationA - durationB;
    }

    return 0;
  });

  return sortedFlights;
};
