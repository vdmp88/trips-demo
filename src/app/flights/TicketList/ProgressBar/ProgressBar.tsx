'use client';

import { useAppSelector } from '@/hooks/hooks';
import styles from './ProgressBar.module.css';
import { useEffect, useState } from 'react';
import Container from '@/components/layout/Container';
import { Typography } from '@/components/ui/Typography/Typography';

export const ProgressBar = () => {
  const { totalProviders, checkedProviders, isLoading } = useAppSelector(
    (state) => state.flights
  );

  const progressPercentage = totalProviders
    ? (checkedProviders / totalProviders) * 100
    : 0;

  const [animatedScale, setAnimatedScale] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setAnimatedScale(progressPercentage));
  }, [progressPercentage]);

  return (
    <>
      {isLoading && (
        <div className={styles.progressContainer}>
          <Container>
            <div className={styles.textWrapper}>
              <span className={styles.loader}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="11"
                    y="2"
                    width="2"
                    height="6"
                    rx="1"
                    fill="#2674EA"
                  />
                  <rect
                    x="11"
                    y="16"
                    width="2"
                    height="6"
                    rx="1"
                    fill="#DBEDFE"
                  />
                  <rect
                    x="18.3638"
                    y="4.22266"
                    width="2"
                    height="6"
                    rx="1"
                    transform="rotate(45 18.3638 4.22266)"
                    fill="#94CEFC"
                  />
                  <rect
                    x="8.46436"
                    y="14.1211"
                    width="2"
                    height="6"
                    rx="1"
                    transform="rotate(45 8.46436 14.1211)"
                    fill="#DBEDFE"
                  />
                  <rect
                    x="2"
                    y="13"
                    width="2"
                    height="6"
                    rx="1"
                    transform="rotate(-90 2 13)"
                    fill="#BFE1FE"
                  />
                  <rect
                    x="16"
                    y="13"
                    width="2"
                    height="6"
                    rx="1"
                    transform="rotate(-90 16 13)"
                    fill="#BFE1FE"
                  />
                  <rect
                    x="4.22168"
                    y="5.63574"
                    width="2"
                    height="6"
                    rx="1"
                    transform="rotate(-45 4.22168 5.63574)"
                    fill="#94CEFC"
                  />
                  <rect
                    x="14.1211"
                    y="15.5352"
                    width="2"
                    height="6"
                    rx="1"
                    transform="rotate(-45 14.1211 15.5352)"
                    fill="#DBEDFE"
                  />
                </svg>
              </span>
              <Typography
                variant="medium16"
                text="Looking for suitable tickets"
              />
            </div>
          </Container>
          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              style={{ width: `${animatedScale}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};
