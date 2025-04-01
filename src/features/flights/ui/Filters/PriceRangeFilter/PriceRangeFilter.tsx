'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { debounce } from 'lodash';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setFilters } from '@/features/flights/flightSlice';
import { Range } from 'react-range';
import { Typography } from '@/components/ui/Typography/Typography';
import { useCurrency } from '@/hooks/useCurrency';
import styles from './PriceRangeFilter.module.css';

export const PriceRangeFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currency } = useCurrency();
  const priceRangeFromStore = useAppSelector(
    (state) => state.flights.filters.priceRange
  );
  const minRange = useAppSelector((state) => state.flights.minPriceRange);
  const maxRange = useAppSelector((state) => state.flights.maxPriceRange);

  const [localPriceRange, setLocalPriceRange] =
    useState<[number, number]>(priceRangeFromStore);

  useEffect(() => {
    setLocalPriceRange(priceRangeFromStore);
  }, [priceRangeFromStore]);

  const debouncedHandlePriceChange = useMemo(
    () =>
      debounce((values: [number, number]) => {
        dispatch(setFilters({ priceRange: values }));
      }, 300),
    [dispatch]
  );

  const handlePriceChange = (values: number[]) => {
    setLocalPriceRange(values as [number, number]);
    debouncedHandlePriceChange(values as [number, number]);
  };

  const getPercent = (value: number) =>
    ((value - minRange) / (maxRange - minRange)) * 100;

  const startPercent = getPercent(localPriceRange[0]);
  const endPercent = getPercent(localPriceRange[1]);

  return (
    <div className={styles.priceFilter}>
      <label>
        <Typography
          variant="regular14"
          text={`${currency.value} ${localPriceRange[0]} - ${currency.value} ${localPriceRange[1]}`}
        />
      </label>
      <Range
        step={1}
        min={minRange}
        max={maxRange}
        values={localPriceRange}
        onChange={handlePriceChange}
        renderTrack={({
          props,
          children,
        }: {
          props: any;
          children: React.ReactNode;
        }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              className={styles.priceRangeInput}
              {...restProps}
              style={{
                ...restProps.style,
                background: `linear-gradient(
                  to right,
                  #ccc 0%,
                  #ccc ${startPercent}%,
                  #2674EA ${startPercent}%,
                  #2674EA ${endPercent}%,
                  #ccc ${endPercent}%,
                  #ccc 100%
                )`,
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }: { props: any }) => {
          const { key, ...restProps } = props;
          return (
            <div key={key} className={styles.priceRangeThumb} {...restProps} />
          );
        }}
      />
    </div>
  );
};
