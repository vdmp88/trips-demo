import { Button } from '@/components/ui/Button/Button';
import { Typography } from '@/components/ui/Typography/Typography';
import styles from './Ticket.module.css';
import { TicketToggle } from '@/features/flights/ui/Ticket/TicketToggle';

type TicketActionProps = {
  price: number;
  currency: string;
  directUrl: string;
  isExpanded: boolean;
  toggle: () => void;
};

export const TicketAction: React.FC<TicketActionProps> = ({
  currency,
  price,
  directUrl,
  toggle,
  isExpanded,
}) => {
  return (
    <div className={styles.ticketAction}>
      <div className={styles.ticketCTA}>
        <div className={styles.price}>
          <Typography variant="subtitle2" text={`${currency} ${price}`} />
        </div>
        <Button href={directUrl} isExternal>
          Select ticket
        </Button>
      </div>
      <TicketToggle toggle={toggle} isExpanded={isExpanded} />
    </div>
  );
};
