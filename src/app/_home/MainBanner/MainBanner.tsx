'use client';

import React from 'react';
import styles from './MainBanner.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import { Button } from '@/components/ui/Button/Button';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useScrollToTop } from '@/hooks/useScrollToTop';

export const MainBanner = () => {
  const t = useTranslations('HomePage');
  const { scrollToTop } = useScrollToTop();

  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.textWrapper}>
        <div className={styles.textWrapperInner}>
          <div className={styles.title}>
            <Typography variant="h3" text={t('banner.title')} />
          </div>
          <div className={styles.description}>
            <Typography variant="medium16" text={t('banner.description')} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button onClick={scrollToTop}>{t('banner.cta')}</Button>
          </div>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/banner.webp"
          width={2499}
          height={1660}
          alt="Banner image"
        />
      </div>
      <div className={styles.mobileButton}>
        <Button onClick={scrollToTop}>{t('banner.cta')}</Button>
      </div>
    </div>
  );
};
