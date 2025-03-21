'use client';

import styles from './SearchForm.module.css';
import { useAppSelector } from '@/hooks/hooks';
import { ButtonInput } from '@/features/searchForm/ui/Input/Input';
import {
  formatDateForInput,
  formatDateForInputShort,
} from '@/features/searchForm/modules/formatDateForInput';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { setSingleFormField } from '@/features/searchForm/store/searchFormSlice';
import { useEffect } from 'react';

type Props = {
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateInputs: React.FC<Props> = ({ setShowCalendar }) => {
  const dispatch = useDispatch();
  const tripType = useAppSelector(
    (state) => state.searchForm.singleForm.tripType
  );

  useEffect(() => {
    if (tripType === 'oneWay') {
      dispatch(setSingleFormField('returnDate', null));
    }
  }, [dispatch, tripType]);

  const departDate = useAppSelector(
    (state) => state.searchForm.singleForm.departDate
  );
  const returnDate = useAppSelector(
    (state) => state.searchForm.singleForm.returnDate
  );

  const departError = useAppSelector(
    (state) => state.searchForm.singleFormErrors.departDate
  );
  const returnError = useAppSelector(
    (state) => state.searchForm.singleFormErrors.returnDate
  );

  return (
    <>
      <div
        className={classNames(
          styles.inputWrapper,
          styles.showOnMobile,
          styles.datesInput
        )}
      >
        <ButtonInput
          placeholder="Select dates"
          name="dates"
          title="Dates"
          value={
            departDate
              ? `${formatDateForInputShort(departDate)}${returnDate ? ' - ' + formatDateForInputShort(returnDate) : ''}`
              : ''
          }
          type="button"
          onClick={() => setShowCalendar(true)}
          error={!!departError || !!returnError}
          onClear={() => {
            dispatch(setSingleFormField('departDate', null));
            dispatch(setSingleFormField('returnDate', null));
          }}
        />
      </div>

      <div className={classNames(styles.inputWrapper, styles.hideOnMobile)}>
        <ButtonInput
          placeholder="Add date"
          name="depart"
          title="Depart"
          value={departDate ? formatDateForInput(departDate) : ''}
          type="button"
          onClick={() => setShowCalendar(true)}
          error={!!departError}
          onClear={() => {
            dispatch(setSingleFormField('departDate', null));
            dispatch(setSingleFormField('returnDate', null));
          }}
        />
      </div>

      {tripType === 'round' && (
        <div className={classNames(styles.inputWrapper, styles.hideOnMobile)}>
          <ButtonInput
            placeholder="Add date"
            name="return"
            title="Return"
            value={returnDate ? formatDateForInput(returnDate) : ''}
            type="button"
            onClick={() => setShowCalendar(true)}
            onClear={() => dispatch(setSingleFormField('returnDate', null))}
            error={!!returnError}
          />
        </div>
      )}
    </>
  );
};

export default DateInputs;
