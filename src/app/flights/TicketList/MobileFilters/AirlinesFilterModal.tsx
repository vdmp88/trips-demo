'use client';

import { AirlinesFilter } from '@/features/flights/ui/Filters/AirlinesFilter/AirlinesFilter';
import styles from './MobileFilters.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';

interface AirlinesFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResetAll: () => void;
}

export const AirlinesFilterModal: React.FC<AirlinesFilterModalProps> = ({
  isOpen,
  onClose,
  onResetAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.airlinesModal}>
      <div className={styles.modalHeader}>
        <Typography className={styles.modalTitle} text="Airlines" />
      </div>
      <div className={styles.modalContent}>
        <AirlinesFilter />
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
