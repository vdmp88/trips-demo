import React from 'react';
import { Range, getTrackBackground } from 'react-range';
import { format, setHours, setMinutes } from 'date-fns';
import styles from './DepartureTimeFilter.module.css';

interface TimeRangeInputProps {
  label: string;
  values: [number, number];
  onChange: (values: [number, number]) => void;
  min: number;
  max: number;
}

const formatTime = (minutes: number): string => {
  const date = setMinutes(setHours(new Date(), 0), minutes);
  return format(date, 'HH:mm');
};

export const TimeRangeInput: React.FC<TimeRangeInputProps> = ({
  label,
  values,
  onChange,
  min,
  max,
}) => {
  return (
    <div className={styles.rangeWrapper}>
      <label>
        {label}: {formatTime(values[0])} - {formatTime(values[1])}
      </label>
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={(newValues) => onChange(newValues as [number, number])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            key={`track-${label}`}
            className={styles.rangeTrack}
            style={{
              ...props.style,
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#2674EA', '#ccc'],
                min,
                max,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={`thumb-${label}-${index}-${key}`}
              {...restProps}
              className={styles.rangeThumb}
            />
          );
        }}
      />
    </div>
  );
};
