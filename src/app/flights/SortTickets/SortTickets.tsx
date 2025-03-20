'use client';

import { ChangeEvent } from 'react';
import styles from './SortTickets.module.css';
import { setSortOption, SortOption } from '@/features/flights/flightSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { Typography } from '@/components/ui/Typography/Typography';

export const SortTickets: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sortOption } = useAppSelector((state) => state.flights);

  const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSortOption = e.target.value as SortOption;
    dispatch(setSortOption(newSortOption));
  };

  return (
    <div className={styles.sortContainer}>
      {Object.values(SortOption).map((option) => (
        <label
          key={option}
          className={`${styles.sortButton} ${sortOption === option ? styles.active : ''}`}
        >
          <input
            type="radio"
            value={option}
            checked={sortOption === option}
            onChange={handleSortChange}
            className={styles.hiddenRadio}
          />
          <Typography variant="semiBold16" text={option} />
        </label>
      ))}
    </div>
  );
};
