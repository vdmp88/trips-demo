import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Ticket.module.css';

type Props = {
  isExpanded: boolean;
  toggle: () => void;
};

export const TicketToggle: React.FC<Props> = ({ isExpanded, toggle }) => {
  return (
    <div className={styles.ticketHeaderCTA}>
      <motion.button
        className={`${styles.expandButton} ${isExpanded ? styles.active : ''}`}
        onClick={toggle}
        animate={{ rotate: isExpanded ? 180 : 0 }}
      >
        <Image src="/svg/arrow.svg" height={24} width={24} alt="arrow" />
      </motion.button>
    </div>
  );
};
