'use client';

import { ProgressBar } from '@/app/flights/TicketList/ProgressBar/ProgressBar';
import { useAppSelector } from '@/hooks/hooks';

export const ProgressBarWrapper = () => {
  const { isLoading } = useAppSelector((state) => state.flights);
  return (
    isLoading && <ProgressBar loadingText="Looking for suitable tickets" />
  );
};
