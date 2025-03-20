import React from 'react';
import styles from './Ticket.module.css';

export const TicketSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.ticketHeaderSkeleton}>
      <div className={styles.skeletonInformation} />
      <div className={styles.expandMobileButtonSkeleton} />
    </div>
    <div className={styles.ticketActionSkeleton}>
      <div className={styles.priceSkeleton} />
      <div className={styles.actionButtonSkeleton} />
    </div>
    <div className={styles.expandButtonSkeleton} />
  </div>
);
