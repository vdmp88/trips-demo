import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Ticket.module.css';
import { FlightInfo } from '@/features/flights/flightSlice';
import { TicketHeader } from '@/features/flights/ui/Ticket/TicketHeader';
import { TicketContent } from '@/features/flights/ui/Ticket/TicketContent';
import { TicketAction } from '@/features/flights/ui/Ticket/TicketAction';
import { FlightDuration, getFlightDuration } from '@/modules/getFlightDuration';

type TicketProps = FlightInfo & {
  // idk
};

export const Ticket: React.FC<TicketProps> = ({
  departureDate,
  departureTime,
  departureAirport,
  arrivalDate,
  arrivalTime,
  arrivalAirport,
  airlineName,
  price,
  currency,
  directUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const durationData: FlightDuration = {
    departureDate,
    departureTime,
    arrivalDate,
    arrivalTime,
  };

  const travelTime = getFlightDuration(durationData);
  const formattedTravelTime = `${travelTime.hours}h ${travelTime.minutes}m`;

  return (
    <div className={styles.ticket}>
      <div className={styles.ticketHeader}>
        <TicketHeader
          departureTime={departureTime}
          departureAirport={departureAirport}
          arrivalTime={arrivalTime}
          arrivalAirport={arrivalAirport}
          travelTime={formattedTravelTime}
          isExpanded={isExpanded}
          toggle={toggleExpand}
        />
        <div className={styles.ticketActionWrapper}>
          <TicketAction
            currency={currency}
            price={price}
            directUrl={directUrl}
            toggle={toggleExpand}
            isExpanded={isExpanded}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="ticket-details"
            className={styles.ticketDetails}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className={styles.ticketDetailsList}>
              <TicketContent
                arrivalTime={arrivalTime}
                departureTime={departureTime}
                departureAirport={departureAirport}
                arrivalAirport={arrivalAirport}
                departureDate={departureDate}
                travelTime={formattedTravelTime}
                airlineName={airlineName}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.mobileAction}>
        <TicketAction
          currency={currency}
          price={price}
          directUrl={directUrl}
          toggle={toggleExpand}
          isExpanded={isExpanded}
        />
      </div>
    </div>
  );
};
