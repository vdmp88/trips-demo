import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import styles from './SingleCalendarPopup.module.css';
import Select from '@/components/ui/Select';
import { setSingleFormField } from '@/features/searchForm/store/searchFormSlice';
import Image from 'next/image';
import { forwardRef, useEffect, useState } from 'react';
import BaseSelectItem from '@/components/ui/Select/BaseSelectItem';
import BaseTabButton from '@/components/ui/Tabs/BaseTabButton';
import Calendar from '@/libraries/Calendar';
import { Button } from '@/components/ui/Button/Button';
import { parseISO } from 'date-fns';
import classNames from 'classnames';
import OneWayIcon from '@/icons/oneway.svg';
import RoundTripIcon from '@/icons/roundtrip.svg';
import CloseIcon from '@/icons/close.svg';
import formatDateForInput from '@/features/searchForm/modules/formatDateForInput';
import PopupBase from '@/components/ui/PopupBase/PopupBase';
import PopupBaseMobileHeader from '@/components/ui/PopupBase/PopupBaseMobileHeader';
import { toast } from 'sonner';

type Props = {
  show: boolean;
  initialStartDate?: string | null;
  initialEndDate?: string | null;
  onClosePress: () => void;
  onApplyPress: (startDate: string, endDate?: string) => void;
  dateNotSelectedError?: string;
};

const tripData = [
  { label: 'Round-trip', value: 'round' },
  { label: 'One-way', value: 'oneWay' },
] as const;

const SingleCalendarPopup = forwardRef<HTMLDivElement, Props>(
  (
    {
      show,
      onApplyPress,
      onClosePress,
      initialEndDate,
      initialStartDate,
      dateNotSelectedError,
    },
    ref
  ) => {
    const [startDate, setStartDate] = useState<Date | null>(
      initialStartDate ? parseISO(initialStartDate) : null
    );

    const [endDate, setEndDate] = useState<Date | null>(
      initialEndDate ? parseISO(initialEndDate) : null
    );
    const [flexible, setFlexible] = useState(false);
    const [selectEndDate, setSelectEndDate] = useState(false);

    const tripType = useAppSelector(
      (state) => state.searchForm.singleForm.tripType
    );

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    useEffect(() => {
      if (tripType === 'oneWay') setEndDate(null);
    }, [tripType]);

    const dispatch = useAppDispatch();

    const handleApply = () => {
      if (!startDate || (tripType === 'round' && !endDate)) {
        toast.info(dateNotSelectedError ?? 'Please select a date');
        return;
      }

      onApplyPress(startDate.toISOString(), endDate?.toISOString());
    };

    const renderSelectItem = (item: (typeof tripData)[number]) => (
      <BaseSelectItem className={styles.tripSelectItem}>
        <Image
          src={item.value === 'oneWay' ? OneWayIcon : RoundTripIcon}
          alt={`${item.value}-icon`}
        />
        <span>{item.label}</span>
      </BaseSelectItem>
    );

    if (!show) return null;

    return (
      <PopupBase className={styles.popup} ref={ref}>
        <PopupBaseMobileHeader
          className={styles.showOnMobile}
          title="Calendar"
          onClosePress={onClosePress}
        />

        <div className={classNames(styles.divider, styles.showOnMobile)} />

        <div className={classNames(styles.inputs, styles.showOnMobile)}>
          <div className={styles.input}>
            <div className={styles.inputContent}>
              <span className={styles.inputTitle}>Depart</span>
              <span className={styles.inputValue}>
                {startDate ? formatDateForInput(startDate) : 'Add date'}
              </span>
            </div>
            {startDate && (
              <button
                className={styles.clearInput}
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                <Image src={CloseIcon} alt="clear-depart" />
              </button>
            )}
          </div>

          {tripType === 'round' && (
            <div className={styles.input}>
              <div className={styles.inputContent}>
                <span className={styles.inputTitle}>Return</span>
                <span className={styles.inputValue}>
                  {endDate ? formatDateForInput(endDate) : 'Add date'}
                </span>
              </div>
              {endDate && (
                <button
                  className={styles.clearInput}
                  onClick={() => {
                    setEndDate(null);
                    setSelectEndDate(true);
                  }}
                >
                  <Image src={CloseIcon} alt="clear-return" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className={styles.header}>
          <Select
            data={tripData}
            onChange={(selected) => {
              dispatch(setSingleFormField('tripType', selected.value));
            }}
            value={tripData.find((item) => item.value === tripType) ?? null}
            renderItem={renderSelectItem}
          />
          <div className={styles.tabs}>
            <BaseTabButton
              text="Specific dates"
              active={!flexible}
              onClick={() => setFlexible(false)}
            />
            <BaseTabButton
              text="Flexible dates"
              active={flexible}
              onClick={() => setFlexible(true)}
            />
          </div>
        </div>

        <Calendar
          className={styles.calendar}
          showAdjacementDays={false}
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          range={tripType === 'round'}
          calendars={12}
          selectEndDate={selectEndDate}
          onSelectEndChange={setSelectEndDate}
          minDate={new Date()}
          maxDate={maxDate}
        />
        <div className={styles.divider} />
        <div className={styles.footer}>
          <Button variant="primary" type="button" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopupBase>
    );
  }
);

SingleCalendarPopup.displayName = 'SingleCalendarPopup';
export default SingleCalendarPopup;
