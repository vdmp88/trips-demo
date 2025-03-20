import { TicketAction } from '@/features/flights/ui/Ticket/TicketAction';
import { TicketHeader } from '@/features/flights/ui/Ticket/TicketHeader';
import styles from '../Ticket/Ticket.module.css';
import { RoundFlightTrip } from '@/features/flights/flightSlice';
import { FlightDuration, getFlightDuration } from '@/modules/getFlightDuration';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TicketContent } from '@/features/flights/ui/Ticket/TicketContent';
import { TicketToggle } from '@/features/flights/ui/Ticket/TicketToggle';

export const TicketSameAirline: React.FC<RoundFlightTrip> = ({
  returnFlightInfo,
  flightInfo,
  price,
  currency,
  directUrl,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const flightDuration: FlightDuration = {
    departureDate: flightInfo.departureDate,
    departureTime: flightInfo.departureTime,
    arrivalDate: flightInfo.arrivalDate,
    arrivalTime: flightInfo.arrivalTime,
  };

  const travelTime = getFlightDuration(flightDuration);
  const formattedFlightInfoTime = `${travelTime.hours}h ${travelTime.minutes}m`;

  const returnFlightDuration: FlightDuration = {
    departureDate: returnFlightInfo.departureDate,
    departureTime: returnFlightInfo.departureTime,
    arrivalDate: returnFlightInfo.arrivalDate,
    arrivalTime: returnFlightInfo.arrivalTime,
  };
  const returnTravelTime = getFlightDuration(returnFlightDuration);
  const formattedReturnFlightTime = `${returnTravelTime.hours}h ${returnTravelTime.minutes}m`;

  return (
    <>
      <div className={`${styles.ticket} ${styles.sameAirlineTicket}`}>
        <div className={styles.ticketHeader}>
          <div className={styles.ticketInnerWrapper}>
            <TicketHeader
              departureTime={flightInfo.departureTime}
              departureAirport={flightInfo.departureAirport}
              arrivalTime={flightInfo.arrivalTime}
              arrivalAirport={flightInfo.arrivalAirport}
              travelTime={formattedFlightInfoTime}
              isExpanded={isExpanded}
              toggle={toggleExpand}
            />
            <TicketHeader
              departureTime={returnFlightInfo.departureTime}
              departureAirport={returnFlightInfo.departureAirport}
              arrivalTime={returnFlightInfo.arrivalTime}
              arrivalAirport={returnFlightInfo.arrivalAirport}
              travelTime={formattedReturnFlightTime}
              isExpanded={isExpanded}
              toggle={toggleExpand}
            />
            <div className={styles.mobileExpandButton}>
              <TicketToggle toggle={toggleExpand} isExpanded={isExpanded} />
            </div>
          </div>
          <div className={styles.ticketActionWrapper}>
            <TicketAction
              currency={currency}
              price={price}
              directUrl={directUrl || flightInfo.directUrl}
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
                  arrivalTime={flightInfo.arrivalTime}
                  departureTime={flightInfo.departureTime}
                  departureAirport={flightInfo.departureAirport}
                  arrivalAirport={flightInfo.arrivalAirport}
                  departureDate={flightInfo.departureDate}
                  travelTime={formattedFlightInfoTime}
                  airlineName={flightInfo.airlineName}
                />

                <TicketContent
                  arrivalTime={returnFlightInfo.arrivalTime}
                  departureTime={returnFlightInfo.departureTime}
                  departureAirport={returnFlightInfo.departureAirport}
                  arrivalAirport={returnFlightInfo.arrivalAirport}
                  departureDate={returnFlightInfo.departureDate}
                  travelTime={formattedFlightInfoTime}
                  airlineName={returnFlightInfo.airlineName}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={styles.mobileAction}>
          <TicketAction
            currency={currency}
            price={price}
            directUrl={directUrl || flightInfo.directUrl}
            toggle={toggleExpand}
            isExpanded={isExpanded}
          />
        </div>
      </div>
    </>
  );
};
