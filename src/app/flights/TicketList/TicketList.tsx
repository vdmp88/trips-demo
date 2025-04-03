'use client';

import { Ticket } from '@/features/flights/ui/Ticket/Ticket';
import styles from './TicketList.module.css';
import { TicketSkeleton } from '@/features/flights/ui/Ticket/TicketSkeleton';
import { useEffect, useState } from 'react';
import {
  Filter,
  FlightTrip,
  searchFlights,
  SortOption,
  stopSearch,
} from '@/features/flights/flightSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useSearchParams } from 'next/navigation';
import { TicketSameAirline } from '@/features/flights/ui/TicketSameAirline/TicketSameAirline';
import { sortFlights } from '@/app/flights/TicketList/modules/sortFlights';
import getFlightParams from '@/app/flights/TicketList/modules/getFlightParams';
import { setSingleFormField } from '@/features/searchForm/store/searchFormSlice';
import airports from '@/features/searchForm/airports.json';
import { Button } from '@/components/ui/Button/Button';
import { Typography } from '@/components/ui/Typography/Typography';

const parseTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const TicketList = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const tripType = useAppSelector(
    (state) => state.searchForm.singleForm.tripType
  );

  const { flightTrips, sortOption, filters, hasInitialResults } =
    useAppSelector((state) => state.flights);

  const [filteredAndSortedTrips, setFilteredAndSortedTrips] = useState<
    FlightTrip[]
  >([]);

  const [displayedTrips, setDisplayedTrips] = useState<number>(5);

  const applyFiltersAndSort = (
    trips: FlightTrip[],
    filters: Filter,
    sortOption: SortOption
  ) => {
    const filteredTrips = trips.filter((trip) => {
      let price: number;
      let outboundDepartureTime: number;
      let returnDepartureTime: number | null = null;
      let airlines: string[] = [];

      switch (trip['@']) {
        case 'OneWayFlightTrip':
          price = trip.flightInfo.price;
          outboundDepartureTime = parseTimeToMinutes(
            trip.flightInfo.departureTime
          );
          airlines = [trip.flightInfo.airlineName];
          break;
        case 'RoundFlightTrip':
          price = trip.price;
          outboundDepartureTime = parseTimeToMinutes(
            trip.flightInfo.departureTime
          );
          returnDepartureTime = parseTimeToMinutes(
            trip.returnFlightInfo.departureTime
          );
          airlines = [
            trip.flightInfo.airlineName,
            trip.returnFlightInfo.airlineName,
          ];
          break;
        case 'MultiCityFlightTrip':
          price = trip.price;
          outboundDepartureTime = parseTimeToMinutes(
            trip.flightInfo[0].departureTime
          );
          airlines = trip.flightInfo.map((info) => info.airlineName);
          break;
        default:
          return false;
      }

      const withinPriceRange =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];
      const withinOutboundTime =
        outboundDepartureTime >= filters.departureTimeRange.outbound[0] &&
        outboundDepartureTime <= filters.departureTimeRange.outbound[1];
      const withinReturnTime =
        returnDepartureTime === null ||
        (returnDepartureTime >= filters.departureTimeRange.return[0] &&
          returnDepartureTime <= filters.departureTimeRange.return[1]);
      const airlineMatch =
        filters.airlines.length === 0 ||
        airlines.some((airline) => filters.airlines.includes(airline));

      return (
        withinPriceRange &&
        withinOutboundTime &&
        withinReturnTime &&
        airlineMatch
      );
    });

    return sortFlights(filteredTrips, sortOption);
  };

  useEffect(() => {
    if (flightTrips.length > 0) {
      const updatedTickets = applyFiltersAndSort(
        flightTrips,
        filters,
        sortOption
      );
      setFilteredAndSortedTrips(updatedTickets);
    }
  }, [flightTrips, filters, sortOption]);

  useEffect(() => {
    const flightParams = getFlightParams(searchParams);
    dispatch(searchFlights(flightParams));

    const airportFrom = airports.find(
      (airport) =>
        airport.iata.toLowerCase() === flightParams.departureCode.toLowerCase()
    );
    const airportTo = airports.find(
      (airport) => airport.iata === flightParams.destinationCode
    );

    if (airportFrom) dispatch(setSingleFormField('from', airportFrom));
    if (airportTo) dispatch(setSingleFormField('to', airportTo));
    dispatch(setSingleFormField('departDate', flightParams.departureDate));
    if (flightParams.returnDate) {
      dispatch(setSingleFormField('returnDate', flightParams.returnDate));
    }

    return () => {
      stopSearch();
    };
  }, [dispatch, searchParams]);

  const handleLoadMore = () => {
    setDisplayedTrips((prevCount) => prevCount + 5);
  };

  const renderTickets = (trips: typeof flightTrips) => {
    return trips.map((trip) => {
      let isSameAirline: boolean | undefined;
      if (trip['@'] === 'RoundFlightTrip') {
        isSameAirline =
          trip.flightInfo.airline === trip.returnFlightInfo.airline;
      }

      return (
        <div className={styles.ticketWrapper} key={trip.searchResultId}>
          {trip['@'] === 'OneWayFlightTrip' && <Ticket {...trip.flightInfo} />}
          {trip['@'] === 'RoundFlightTrip' && (
            <>
              {isSameAirline && <TicketSameAirline {...trip} />}
              {!isSameAirline && (
                <>
                  <Ticket {...trip.flightInfo} />
                  <div className={styles.divider} />
                  <Ticket {...trip.returnFlightInfo} />
                </>
              )}
            </>
          )}
        </div>
      );
    });
  };

  if (!hasInitialResults) {
    return (
      <div className={styles.ticketList}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <div className={styles.ticketWrapper} key={idx}>
            {tripType === 'round' ? (
              <>
                <TicketSkeleton />
                <div className={styles.divider} />
                <TicketSkeleton />
              </>
            ) : (
              <TicketSkeleton />
            )}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.ticketList}>
      {filteredAndSortedTrips.length === 0 ? (
        <Typography
          variant="regular16"
          text="No flights found matching your criteria"
          className={styles.noResults}
        />
      ) : (
        <>
          {renderTickets(filteredAndSortedTrips.slice(0, displayedTrips))}
          {displayedTrips < filteredAndSortedTrips.length && (
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className={styles.loadMoreButton}
            >
              View more
            </Button>
          )}
        </>
      )}
    </div>
  );
};
