'use client';

import LocaleSwitcher from '@/features/locale/ui/LocaleSwitcher';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { CurrencySwitcher } from '@/features/locale/ui/CurrencySwitcher';
import Container from '@/components/layout/Container';
import { MobileNavigation } from '@/components/layout/Header/MobileMenu/MobileNavigation';

export default function Header() {
  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.headerWrapper}>
          <Link href="/" className={styles.logoWrapper}>
            <Image
              src="/images/logotype.svg"
              alt="Logo"
              width={160}
              height={40}
            />
          </Link>
          <div className={styles.localeSettings}>
            <div className={styles.currencyWrapper}>
              <CurrencySwitcher />
            </div>
            <div className={styles.languageWrapper}>
              <LocaleSwitcher />
            </div>
          </div>
          <div className={styles.mobileNavigation}>
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </div>
  );
}
