import { forwardRef } from 'react';
import styles from './TravellersPopup.module.css';
import PopupBase from '@/components/ui/PopupBase/PopupBase';
import TravellersItem from '@/features/searchForm/ui/TravellersPopup/TravellersItem';
import { Button } from '@/components/ui/Button/Button';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { setClassType } from '@/features/searchForm/store/searchFormSlice';
import classNames from 'classnames';
import PopupBaseMobileHeader from '@/components/ui/PopupBase/PopupBaseMobileHeader';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import useScrollBlock from '@/hooks/useScrollBlock';

type Props = {
  show: boolean;
  onSave: () => void;
  onClose: () => void;
};

const TravellersPopup = forwardRef<HTMLDivElement, Props>(
  ({ show, onSave, onClose }, ref) => {
    const classType = useAppSelector(
      (state) => state.searchForm.travellers.classType
    );
    const dispatch = useAppDispatch();

    const isFullScreen = useMediaQuery('max', 768);

    useScrollBlock(isFullScreen && show);

    if (!show) {
      return null;
    }
    return (
      <PopupBase ref={ref} className={styles.popup}>
        <span className={classNames(styles.title, styles.hideOnMobile)}>
          Number of passengers
        </span>

        <PopupBaseMobileHeader
          title="Number of passengers"
          onClosePress={onClose}
          className={styles.showOnMobile}
        />
        <div className={classNames(styles.divider, styles.showOnMobile)}></div>

        <div className={styles.travellers}>
          <TravellersItem
            traveller="adults"
            disabledAt={1}
            title="Adults"
            subtitle="12 + years"
          />
          <TravellersItem
            traveller="children"
            disabledAt={0}
            title="Children"
            subtitle="2 - 11 years"
          />
          <TravellersItem
            traveller="infants"
            disabledAt={0}
            title="Infants"
            subtitle="0 - 23 month"
          />
        </div>
        <div className={styles.hintContainer}>
          <span className={styles.hint}>
            Your age at time of travel must be valid for the age category
            booked. Airlines have restrictions on under 18s travelling alone.
          </span>

          <span className={styles.hint}>
            Age limits and policies for travelling with children may vary so
            please check with the airline before booking.
          </span>
        </div>

        <span className={styles.title}>Class</span>

        <div className={styles.classType}>
          <label className={styles.classTypeItem}>
            <input
              type="radio"
              name="class"
              value="economy"
              checked={classType === 'economy'}
              onChange={() => {
                dispatch(setClassType('economy'));
              }}
            />
            <span className={styles.classTypeText}>Economy</span>
            <div className={styles.classTypeIcon}></div>
          </label>
          <label className={styles.classTypeItem}>
            <input
              type="radio"
              name="class"
              value="premium"
              checked={classType === 'premium'}
              onChange={() => {
                dispatch(setClassType('premium'));
              }}
            />
            <span className={styles.classTypeText}>Premium</span>
            <div className={styles.classTypeIcon}></div>
          </label>
        </div>

        <div className={styles.applyContainer}>
          <Button variant="primary" onClick={onSave}>
            Apply
          </Button>
        </div>
      </PopupBase>
    );
  }
);

TravellersPopup.displayName = 'TravellersPopup';

export default TravellersPopup;
