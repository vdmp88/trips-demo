import { useAppSelector } from '@/hooks/hooks';
import styles from './ProgressBar.module.css';
import { useEffect, useState } from 'react';

export const ProgressBar = () => {
  const { totalProviders, checkedProviders } = useAppSelector(
    (state) => state.flights
  );
  const progressPercentage = totalProviders
    ? (checkedProviders / totalProviders) * 100
    : 0;
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    setAnimatedWidth(progressPercentage);
  }, [progressPercentage]);

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressBar}
        style={{ width: `${animatedWidth}%` }}
      />
    </div>
  );
};
