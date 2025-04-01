'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Filters.module.css';
import Image from 'next/image';
import { Typography } from '@/components/ui/Typography/Typography';

interface CollapsibleFilterProps {
  title: string;
  children: ReactNode;
  isLast: boolean;
}

const CollapsibleFilter: React.FC<CollapsibleFilterProps> = ({
  title,
  children,
  isLast = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className={styles.filterBlock}>
      <div
        className={styles.collapsibleFilterHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Typography variant="medium16" text={title} />
        <motion.span
          className={styles.arrow}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Image src="/svg/arrow.svg" alt="svg arrow" width={24} height={24} />
        </motion.span>
        {(!isLast || isOpen) && <div className={styles.divider} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.content}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollapsibleFilter;
