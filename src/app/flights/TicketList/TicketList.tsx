'use client';

import { Ticket } from '@/features/flights/ui/Ticket/Ticket';
import styles from './TicketList.module.css';
import { TicketSkeleton } from '@/features/flights/ui/Ticket/TicketSkeleton';
import { useEffect, useMemo, useState } from 'react';
import {
  CabinClass,
  searchFlights,
  SearchParams,
  stopSearch,
} from '@/features/flights/flightSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { ProgressBar } from '@/app/flights/TicketList/ProgressBar/ProgressBar';
import { useSearchParams } from 'next/navigation';
import { TicketSameAirline } from '@/features/flights/ui/TicketSameAirline/TicketSameAirline';
import { sortFlights } from '@/app/flights/TicketList/modules/sortFlights';

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
    const flightParams: SearchParams = {
      departureCode: searchParams.get('departureCode') || '',
      departureDate: searchParams.get('departureDate') || '',
      destinationCode: searchParams.get('destinationCode') || '',
      cabinClass: searchParams.get('cabinClass') as CabinClass,
      adults: Number(searchParams.get('adults')) || 1,
      children: Number(searchParams.get('children')) || 0,
      infant: Number(searchParams.get('infant')) || 0,
      language: searchParams.get('language') || 'en',
      currency: searchParams.get('currency') || 'USD',
    };

    const returnDate = searchParams.get('returnDate');
    if (returnDate) {
      flightParams.returnDate = returnDate;
    }

    dispatch(searchFlights(flightParams));

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
