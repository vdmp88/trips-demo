'use client';

import { DepartureTimeFilter } from '@/features/flights/ui/Filters/DepartureTimeFilter/DepartureTimeFilter';
import styles from './MobileFilters.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';

interface DepartureTimeFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAll: () => void;
}

export const DepartureTimeFilterModal: React.FC<
  DepartureTimeFilterModalProps
> = ({ isOpen, onClose, onResetAll }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.departureModal}>
      <div className={styles.modalHeader}>
        <Typography className={styles.modalTitle} text="Departure Time" />
      </div>
      <div className={styles.modalContent}>
        <DepartureTimeFilter />
      </div>
      <div className={styles.modalFooter}>
        <button className={styles.resetAll} onClick={onResetAll}>
          Reset all filters
        </button>
        <Button onClick={onClose}>Apply</Button>
      </div>
    </div>
  );
};
