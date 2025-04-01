'use client';

import { AirlinesFilter } from '@/features/flights/ui/Filters/AirlinesFilter/AirlinesFilter';
import { DepartureTimeFilter } from '@/features/flights/ui/Filters/DepartureTimeFilter/DepartureTimeFilter';
import { PriceRangeFilter } from '@/features/flights/ui/Filters/PriceRangeFilter/PriceRangeFilter';
import styles from './Filters.module.css';
import CollapsibleFilter from '@/app/flights/Filters/CollapsibleFilter';
import { useAppSelector } from '@/hooks/hooks';
import { ProgressBar } from '@/app/flights/TicketList/ProgressBar/ProgressBar';
import { Typography } from '@/components/ui/Typography/Typography';

const filters = [
  { title: 'Price', component: <PriceRangeFilter /> },
  { title: 'Airlines', component: <AirlinesFilter /> },
  { title: 'Departure Time', component: <DepartureTimeFilter /> },
];

export const Filters = () => {
  const { isLoading } = useAppSelector((state) => state.flights);

  return (
    <div className={styles.filters}>
      {isLoading && (
        <div className={styles.progressBarWrapper}>
          <Typography variant="medium14" text="Loading filters" />
          <ProgressBar showContainer={false} progressBarOnly customHeight={2} />
        </div>
      )}
      {!isLoading &&
        filters.map((filter, index) => (
          <CollapsibleFilter
            key={filter.title}
            title={filter.title}
            isLast={index === filters.length - 1}
          >
            {filter.component}
          </CollapsibleFilter>
        ))}
    </div>
  );
};
