'use client';

import { PriceRangeFilter } from '@/features/flights/ui/Filters/PriceRangeFilter/PriceRangeFilter';
import styles from './MobileFilters.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';

interface PriceFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAll: () => void;
}

export const PriceFilterModal: React.FC<PriceFilterModalProps> = ({
  isOpen,
  onClose,
  onResetAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.priceModal}>
      <div className={styles.modalHeader}>
        <Typography className={styles.modalTitle} text="Price" />
      </div>
      <div className={styles.modalContent}>
        <PriceRangeFilter />
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
