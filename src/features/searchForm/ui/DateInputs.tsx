'use client';

import styles from './SearchForm.module.css';
import { useAppSelector } from '@/hooks/hooks';
import { ButtonInput } from '@/features/searchForm/ui/Input/Input';
import {
  formatDateForInput,
  formatDateForInputShort,
} from '@/features/searchForm/modules/formatDateForInput';
import classNames from 'classnames';

type Props = {
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
};

const DateInputs: React.FC<Props> = ({ setShowCalendar }) => {
  const tripType = useAppSelector(
    (state) => state.searchForm.singleForm.tripType
  );

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
            error={!!returnError}
          />
        </div>
      )}
    </>
  );
};

export default DateInputs;
