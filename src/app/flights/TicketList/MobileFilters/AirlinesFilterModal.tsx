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
        <button className={styles.closeButton} onClick={onClose}>
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26 14L14 26"
              stroke="#181D27"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 14L26 26"
              stroke="#181D27"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
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
