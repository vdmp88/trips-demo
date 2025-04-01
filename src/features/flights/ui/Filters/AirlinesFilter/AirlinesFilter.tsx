'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setFilters } from '@/features/flights/flightSlice';
import styles from './AirlinesFilter.module.css';

export const AirlinesFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedAirlines = useAppSelector(
    (state) => state.flights.filters.airlines
  );
  const flightTrips = useAppSelector((state) => state.flights.flightTrips);

  const allAirlines = Array.from(
    new Set(
      flightTrips.flatMap((trip) => {
        if (trip['@'] === 'OneWayFlightTrip') {
          return [trip.flightInfo.airlineName];
        } else if (trip['@'] === 'RoundFlightTrip') {
          return [
            trip.flightInfo.airlineName,
            trip.returnFlightInfo.airlineName,
          ];
        } else if (trip['@'] === 'MultiCityFlightTrip') {
          return trip.flightInfo.map((info) => info.airlineName);
        }
        return [];
      })
    )
  ).filter(Boolean);

  const handleAirlineChange = (airline: string, isChecked: boolean) => {
    const newAirlines = isChecked
      ? [...selectedAirlines, airline]
      : selectedAirlines.filter((a) => a !== airline);
    dispatch(setFilters({ airlines: newAirlines }));
  };

  return (
    <div className={styles.container}>
      {allAirlines.map((airline) => (
        <label key={airline} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={selectedAirlines.includes(airline)}
            onChange={(e) => handleAirlineChange(airline, e.target.checked)}
          />
          <span className={styles.customCheckbox}>
            {selectedAirlines.includes(airline) && (
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.11834 1.15868L9.12615 1.16655L9.13431 1.17407C9.15122 1.18968 9.16473 1.20862 9.17396 1.2297C9.1832 1.25079 9.18796 1.27356 9.18796 1.29657C9.18796 1.31959 9.1832 1.34236 9.17396 1.36344C9.16473 1.38452 9.15122 1.40347 9.13431 1.41907L9.12691 1.4259L9.11979 1.43302L3.67979 6.87302L3.67978 6.87302L3.67834 6.87447C3.66285 6.8901 3.64441 6.90249 3.62411 6.91095L3.81639 7.3725L3.6241 6.91095C3.6038 6.91942 3.58201 6.92377 3.56001 6.92377C3.538 6.92377 3.51622 6.91942 3.49591 6.91095L3.30362 7.3725L3.49591 6.91095C3.4756 6.90249 3.45717 6.8901 3.44167 6.87447L3.44168 6.87447L3.44023 6.87302L0.880227 4.31302L0.88028 4.31297L0.874059 4.30696C0.856937 4.29042 0.84324 4.27067 0.83375 4.24883C0.824261 4.227 0.819165 4.20351 0.818753 4.17971C0.818341 4.15591 0.822621 4.13226 0.83135 4.11011L0.36617 3.92679L0.83135 4.11011C0.840079 4.08796 0.853084 4.06775 0.869624 4.05063C0.886164 4.0335 0.905915 4.01981 0.927746 4.01032C0.94958 4.00083 0.973068 3.99573 0.996871 3.99532C1.02067 3.99491 1.04433 3.99919 1.06647 4.00792C1.08763 4.01625 1.10701 4.02849 1.12362 4.04398L3.20589 6.1329L3.55968 6.48782L3.9138 6.13322L8.88047 1.15989L8.88167 1.15868C8.89717 1.14305 8.9156 1.13065 8.93591 1.12219C8.95622 1.11373 8.978 1.10938 9.00001 1.10938C9.02201 1.10938 9.04379 1.11373 9.0641 1.12219C9.08441 1.13065 9.10285 1.14305 9.11834 1.15868Z"
                  stroke="white"
                />
              </svg>
            )}
          </span>
          {airline}
        </label>
      ))}
    </div>
  );
};
