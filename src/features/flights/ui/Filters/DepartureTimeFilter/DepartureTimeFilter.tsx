'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setFilters } from '@/features/flights/flightSlice';
import styles from './DepartureTimeFilter.module.css';
import { TimeRangeInput } from './TimeRangeInput';

export const DepartureTimeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const departureTimeRange = useAppSelector(
    (state) => state.flights.filters.departureTimeRange
  );

  const tripType = useAppSelector(
    (state) => state.searchForm.singleForm.tripType
  );

  const [localOutboundValues, setLocalOutboundValues] = useState<
    [number, number]
  >(departureTimeRange.outbound);
  const [localReturnValues, setLocalReturnValues] = useState<[number, number]>(
    departureTimeRange.return
  );

  const minTime = 0;
  const maxTime = 1439;

  const debouncedSetFilters = useMemo(
    () =>
      debounce((outbound: [number, number], returnValues: [number, number]) => {
        dispatch(
          setFilters({
            departureTimeRange: {
              outbound,
              return: returnValues,
            },
          })
        );
      }, 300),
    [dispatch]
  );

  useEffect(() => {
    setLocalOutboundValues(departureTimeRange.outbound);
    setLocalReturnValues(departureTimeRange.return);
  }, [departureTimeRange]);

  const handleOutboundChange = (values: [number, number]) => {
    setLocalOutboundValues(values);
    debouncedSetFilters(values, localReturnValues);
  };

  const handleReturnChange = (values: [number, number]) => {
    setLocalReturnValues(values);
    debouncedSetFilters(localOutboundValues, values);
  };

  return (
    <div className={styles.filterContainer}>
      <TimeRangeInput
        label="Outbound"
        values={localOutboundValues}
        onChange={handleOutboundChange}
        min={minTime}
        max={maxTime}
      />
      {tripType !== 'oneWay' && (
        <TimeRangeInput
          label="Return"
          values={localReturnValues}
          onChange={handleReturnChange}
          min={minTime}
          max={maxTime}
        />
      )}
    </div>
  );
};
