import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import Container from '@/components/layout/Container';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerWrapper}>
          <div className={styles.logoWrapper}>
            <Image
              src="/images/logotype.svg"
              alt="Logo"
              width={160}
              height={40}
            />
            <Typography
              variant="medium18"
              text={"Let's make a great design together"}
            />
          </div>
          <div className={styles.navigation}>
            <ul className={styles.navigationList}>
              <li>
                <Typography variant="semiBold16" text="Explore" />
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="FAQs" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Company info" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Partners" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Advertising" />
                </a>
              </li>
            </ul>

            <ul className={styles.navigationList}>
              <li>
                <Typography variant="semiBold16" text="Information" />
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Cookie policy" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Privacy policy" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Terms of service" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Security" />
                </a>
              </li>
            </ul>

            <ul className={styles.navigationList}>
              <li>
                <Typography variant="semiBold16" text="Get in touch" />
              </li>
              <li>
                <a href="tel:+0000000000">
                  <Typography variant="medium14" text="+000-000-00-00" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Whatsapp" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Email" />
                </a>
              </li>
              <li>
                <a href="#">
                  <Typography variant="medium14" text="Instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <Typography
            variant="regular12"
            text="Copyright © 2024. All rights reserved"
          />
        </div>
      </Container>
    </footer>
  );
}
