import styles from './Ticket.module.css';
import Image from 'next/image';
import { Typography } from '@/components/ui/Typography/Typography';
import { TicketToggle } from '@/features/flights/ui/Ticket/TicketToggle';

type TicketHeaderProps = {
  departureTime: string;
  departureAirport: string;
  arrivalTime: string;
  arrivalAirport: string;
  isExpanded: boolean;
  travelTime: string;
  toggle: () => void;
};

export const TicketHeader: React.FC<TicketHeaderProps> = ({
  departureTime,
  departureAirport,
  arrivalTime,
  arrivalAirport,
  travelTime,
  isExpanded,
  toggle,
}) => {
  return (
    <>
      <div className={styles.ticketInformation}>
        <div className={styles.logo}>
          <Image
            src="/svg/plane.svg"
            height={32}
            width={32}
            alt="airline logo"
          />
        </div>
        <div className={styles.departureInformation}>
          <Typography tag="h2" variant="subtitle2" text={departureTime} />
          <Typography variant="medium16" text={departureAirport} />
        </div>
        <span className={styles.flightDuration}>
          <Typography variant="medium12" text={travelTime} />
          <div className={styles.durationIcon}>
            <div className={styles.line} />
            <Image
              src="/svg/plane.svg"
              height={24}
              width={24}
              alt="plane image"
            />
            <div className={styles.line} />
          </div>
        </span>
        <div className={styles.arrivalInformation}>
          <Typography tag="h2" variant="subtitle2" text={arrivalTime} />
          <Typography variant="medium16" text={arrivalAirport} />
        </div>
      </div>
      <div className={styles.mobileExpandButton}>
        <TicketToggle isExpanded={isExpanded} toggle={toggle} />
      </div>
    </>
  );
};
