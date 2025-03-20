import { Typography } from '@/components/ui/Typography/Typography';
import { useSearchParams } from 'next/navigation';
import styles from './Ticket.module.css';
import { CabinClass } from '@/features/flights/flightSlice';

type TicketContentProps = {
  departureDate: string;
  airlineName: string;
  travelTime: string;
  departureAirport: string;
  arrivalAirport: string;
  arrivalTime: string;
  departureTime: string;
};

export const TicketContent: React.FC<TicketContentProps> = ({
  departureDate,
  arrivalTime,
  departureTime,
  airlineName,
  departureAirport,
  arrivalAirport,
  travelTime,
}) => {
  const searchParams = useSearchParams();
  const cabinClass =
    (searchParams.get('cabinClass') as CabinClass) === 'ECONOMY'
      ? 'Economy cabin'
      : 'Premium cabin';

  return (
    <div className={styles.ticketContent}>
      <div className={styles.departureDate}>
        <Typography variant="semiBold16" text="Departure" />
        <span className={styles.dot} />
        <Typography variant="semiBold16" text={departureDate} />
      </div>
      <div className={styles.airlineWrapper}>
        <div className={styles.departureAirport}>
          <Typography variant="semiBold16" text={`${departureTime} - `} />
          <Typography variant="medium16" text={departureAirport} />
        </div>
        <div className={styles.travelTime}>
          <Typography variant="medium12" text={`Travel time: ${travelTime}`} />
        </div>
        <div className={styles.arrivalAirport}>
          <Typography variant="semiBold16" text={`${arrivalTime} - `} />
          <Typography variant="medium16" text={arrivalAirport} />
        </div>
        <div className={styles.airlineName}>
          <Typography
            variant="medium12"
            text={`${airlineName} / ${cabinClass}`}
          />
        </div>
      </div>
    </div>
  );
};
