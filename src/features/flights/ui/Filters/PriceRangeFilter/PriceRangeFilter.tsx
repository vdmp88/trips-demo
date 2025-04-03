import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { debounce } from 'lodash';
import React, { useState, useMemo, useEffect } from 'react';
import { Typography } from '@/components/ui/Typography/Typography';
import { setFilters } from '@/features/flights/flightSlice';
import { Range } from 'react-range';
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
  const isLoading = useAppSelector((state) => state.flights.isLoading);

  const adjustedMin = minRange ?? 0;
  const adjustedMax = Math.max(adjustedMin + 1, maxRange ?? adjustedMin + 1);

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(
    priceRangeFromStore.length === 2 && adjustedMin < adjustedMax
      ? priceRangeFromStore
      : [adjustedMin, adjustedMax]
  );

  useEffect(() => {
    if (!isLoading && adjustedMin < adjustedMax) {
      setLocalPriceRange([
        Math.max(adjustedMin, Math.min(priceRangeFromStore[0], adjustedMax)),
        Math.min(adjustedMax, Math.max(priceRangeFromStore[1], adjustedMin)),
      ]);
    } else {
      setLocalPriceRange([adjustedMin, adjustedMax]);
    }
  }, [priceRangeFromStore, adjustedMin, adjustedMax, isLoading]);

  const debouncedHandlePriceChange = useMemo(
    () =>
      debounce((values: [number, number]) => {
        dispatch(setFilters({ priceRange: values }));
      }, 300),
    [dispatch]
  );

  const handlePriceChange = (values: number[]) => {
    const [newMin, newMax] = values as [number, number];
    const adjustedValues: [number, number] = [
      Math.max(adjustedMin, Math.min(newMin, adjustedMax)),
      Math.min(adjustedMax, Math.max(newMax, adjustedMin)),
    ];
    setLocalPriceRange(adjustedValues);
    debouncedHandlePriceChange(adjustedValues);
  };

  const getPercent = (value: number) => {
    const range = adjustedMax - adjustedMin;
    return range > 0 ? ((value - adjustedMin) / range) * 100 : 0;
  };

  const startPercent = getPercent(localPriceRange[0]);
  const endPercent = getPercent(localPriceRange[1]);
  const isDisabled = isLoading || adjustedMin >= adjustedMax;

  if (adjustedMin === undefined || adjustedMax === undefined) {
    return (
      <div className={styles.priceFilter}>
        <Typography variant="regular14" text="No price data available" />
      </div>
    );
  }

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
        min={adjustedMin}
        max={adjustedMax}
        values={localPriceRange}
        onChange={handlePriceChange}
        disabled={isDisabled}
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
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {children}
            </div>
          );
        }}
        renderThumb={({ props }: { props: any }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              className={styles.priceRangeThumb}
              {...restProps}
              style={{
                ...restProps.style,
                display: isDisabled ? 'none' : 'block',
              }}
            />
          );
        }}
      />
    </div>
  );
};
