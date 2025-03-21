'use client';

import { Ticket } from '@/features/flights/ui/Ticket/Ticket';
import styles from './TicketList.module.css';
import { TicketSkeleton } from '@/features/flights/ui/Ticket/TicketSkeleton';
import { useEffect, useMemo, useState } from 'react';
import { searchFlights, stopSearch } from '@/features/flights/flightSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { ProgressBar } from '@/app/flights/TicketList/ProgressBar/ProgressBar';
import { useSearchParams } from 'next/navigation';
import { TicketSameAirline } from '@/features/flights/ui/TicketSameAirline/TicketSameAirline';
import { sortFlights } from '@/app/flights/TicketList/modules/sortFlights';
import getFlightParams from '@/app/flights/TicketList/modules/getFlightParams';
import { setSingleFormField } from '@/features/searchForm/store/searchFormSlice';
import airports from '@/features/searchForm/airports.json';

export const TicketList = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const tripType = useAppSelector(
    (state) => state.searchForm.singleForm.tripType
  );
  const sortOption = useAppSelector((state) => state.flights.sortOption);
  const [displayedTrips, setDisplayedTrips] = useState<number>(5);

  const { flightTrips, isLoading, hasInitialResults } = useAppSelector(
    (state) => state.flights
  );

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

    if (airportFrom) {
      dispatch(setSingleFormField('from', airportFrom));
    }
    if (airportTo) {
      dispatch(setSingleFormField('to', airportTo));
    }
    dispatch(setSingleFormField('departDate', flightParams.departureDate));
    if (flightParams.returnDate) {
      dispatch(setSingleFormField('returnDate', flightParams.returnDate));
    }

    return () => {
      stopSearch();
    };
  }, [dispatch, searchParams]);

  const handleLoadMore = () => {
    setDisplayedTrips((prevCount) => prevCount + 10);
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

  const visibleFlights = useMemo(
    () => sortFlights(flightTrips, sortOption, displayedTrips),
    [flightTrips, sortOption, displayedTrips]
  );

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
    <>
      {isLoading && <ProgressBar />}
      <div className={styles.ticketList}>
        {renderTickets(visibleFlights)}
        {displayedTrips < flightTrips.length && (
          <button onClick={handleLoadMore} className={styles.loadMoreButton}>
            Load More
          </button>
        )}
      </div>
    </>
  );
};
