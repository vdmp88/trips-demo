'use client';

import { setSingleFormField } from '@/features/searchForm/store/searchFormSlice';
import TripType from '@/features/searchForm/ui/TripType/TripType';
import styles from './SearchForm.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useRef, useState } from 'react';
import SingleCalendarPopup from '@/features/searchForm/ui/SingleCalendarPopup/SingleCalendarPopup';
import useOutsideClick from '@/hooks/useOutsideClick';
import classNames from 'classnames';
import SearchFlightsBtn from '@/features/searchForm/ui/SearchFlightsBtn';
import FromToInputs from '@/features/searchForm/ui/FromToInputs';
import DateInputs from '@/features/searchForm/ui/DateInputs';
import TravellersInput from '@/features/searchForm/ui/TravellersInput';

type Props = {
  collapsible: boolean;
};

const SearchForm: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  // TODO: Collapsible for flights page

  const tripType = useAppSelector(
    (state) => state.searchForm.singleForm.tripType
  );

  const departDate = useAppSelector(
    (state) => state.searchForm.singleForm.departDate
  );
  const returnDate = useAppSelector(
    (state) => state.searchForm.singleForm.returnDate
  );

  const calendarRef = useRef<HTMLDivElement>(null);

  const [showCalendar, setShowCalendar] = useState(false);

  useOutsideClick([calendarRef], () => {
    setShowCalendar(false);
  });

  return (
    <div>
      <div className={styles.tripTypeContainer}>
        <div className={styles.tripTypeItemWrapper}>
          <TripType
            name="tripType"
            placeholder="Round-trip"
            checked={tripType === 'round'}
            onChange={() => dispatch(setSingleFormField('tripType', 'round'))}
          />
        </div>
        <div className={styles.tripTypeItemWrapper}>
          <TripType
            name="tripType"
            placeholder="One-way"
            checked={tripType === 'oneWay'}
            onChange={() => {
              dispatch(setSingleFormField('tripType', 'oneWay'));
              dispatch(setSingleFormField('returnDate', null));
            }}
          />
        </div>
      </div>
      <div className={styles.controls}>
        <div
          className={classNames(
            styles.inputsContainer,
            tripType === 'oneWay' && styles.inputsContainerOneWay
          )}
        >
          <FromToInputs />

          <DateInputs setShowCalendar={setShowCalendar} />

          <TravellersInput />
        </div>

        <SearchFlightsBtn />

        <SingleCalendarPopup
          show={showCalendar}
          ref={calendarRef}
          initialStartDate={departDate}
          initialEndDate={returnDate}
          onClosePress={() => {
            setShowCalendar(false);
          }}
          onApplyPress={(startDate, endDate) => {
            dispatch(setSingleFormField('departDate', startDate));
            dispatch(setSingleFormField('returnDate', endDate ?? null));
            setShowCalendar(false);
          }}
        />
      </div>
    </div>
  );
};

export default SearchForm;
