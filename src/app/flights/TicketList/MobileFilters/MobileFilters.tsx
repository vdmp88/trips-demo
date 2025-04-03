'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { PriceFilterModal } from '@/app/flights/TicketList/MobileFilters/PriceFilterModal';
import { AirlinesFilterModal } from '@/app/flights/TicketList/MobileFilters/AirlinesFilterModal';
import { DepartureTimeFilterModal } from '@/app/flights/TicketList/MobileFilters/DepartureTimeFilterModal';
import { Button } from '@/components/ui/Button/Button';
import styles from './MobileFilters.module.css';
import useScrollBlock from '@/hooks/useScrollBlock';
import { useAppDispatch } from '@/hooks/hooks';
import { resetAllFilters } from '@/features/flights/flightSlice';

export const MobileFilters = () => {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery('max', 1050);
  const [openModal, setOpenModal] = useState<string | null>(null);
  useScrollBlock(!!openModal);

  if (!isMobile) return null;

  const handleOpenModal = (modalName: string) => {
    setOpenModal(modalName);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  const handleResetAll = () => {
    dispatch(resetAllFilters());
    handleCloseModal();
  };

  return (
    <div className={styles.mobileFilters}>
      <div className={styles.mobileFilterHeader}>
        <Button
          className={styles.mobileFilterButton}
          variant="outline"
          onClick={() => handleOpenModal('price')}
        >
          Price
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#2674EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          className={styles.mobileFilterButton}
          variant="outline"
          onClick={() => handleOpenModal('airlines')}
        >
          Airlines
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#2674EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>

        <Button
          className={styles.mobileFilterButton}
          variant="outline"
          onClick={() => handleOpenModal('departureTime')}
        >
          Departure Time
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="#2674EA"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>

      <div className={styles.mobileFilterContent}>
        {!!openModal && <div className={styles.overlay} />}
        <PriceFilterModal
          isOpen={openModal === 'price'}
          onClose={handleCloseModal}
          onResetAll={handleResetAll}
        />
        <AirlinesFilterModal
          isOpen={openModal === 'airlines'}
          onClose={handleCloseModal}
          onResetAll={handleResetAll}
        />
        <DepartureTimeFilterModal
          isOpen={openModal === 'departureTime'}
          onClose={handleCloseModal}
          onResetAll={handleResetAll}
        />
      </div>
    </div>
  );
};
