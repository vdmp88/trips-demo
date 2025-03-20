'use client';

import { setSingleFormField } from '@/features/searchForm/store/searchFormSlice';
import styles from './SearchForm.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useRef, useState } from 'react';
import { ButtonInput, TextInput } from '@/features/searchForm/ui/Input/Input';
import useOutsideClick from '@/hooks/useOutsideClick';
import AirportsPopup from '@/features/searchForm/ui/AirportsPopup/AirportsPopup';

const FromToInputs: React.FC = () => {
  const dispatch = useAppDispatch();

  const from = useAppSelector((state) => state.searchForm.singleForm.from);
  const to = useAppSelector((state) => state.searchForm.singleForm.to);

  const fromError = useAppSelector(
    (state) => state.searchForm.singleFormErrors.from
  );
  const toError = useAppSelector(
    (state) => state.searchForm.singleFormErrors.to
  );

  const [fromInput, setFromInput] = useState(
    from ? `${from.city} (${from.iata})` : ''
  );
  const [toInput, setToInput] = useState(to ? `${to.city} (${to.iata})` : '');

  const fromInputRef = useRef<HTMLDivElement>(null);
  const toInputRef = useRef<HTMLDivElement>(null);

  const [showFromPopup, setShowFromPopup] = useState(false);
  const [showToPopup, setShowToPopup] = useState(false);

  useOutsideClick([fromInputRef], () => {
    setShowFromPopup(false);
  });

  useOutsideClick([toInputRef], () => {
    setShowToPopup(false);
  });

  return (
    <>
      <div className={styles.inputWrapper} ref={fromInputRef}>
        <div className={styles.hideOnMobile}>
          <TextInput
            placeholder="City or airport"
            name="from"
            title="From"
            type="input"
            value={fromInput}
            onChange={(e) => {
              if (!showFromPopup) setShowFromPopup(true);
              setFromInput(e.currentTarget.value);
            }}
            onFocus={() => setShowFromPopup(true)}
            error={!!fromError}
          />
        </div>
        <div className={styles.showOnMobile}>
          <ButtonInput
            title="From"
            placeholder="From"
            value={fromInput}
            onClick={() => setShowFromPopup(true)}
            error={!!fromError}
          />
        </div>
        <AirportsPopup
          title="From"
          onClosePress={() => setShowFromPopup(false)}
          show={showFromPopup}
          inputValue={fromInput}
          setInputValue={setFromInput}
          onSelect={(selected) => {
            setShowFromPopup(false);
            dispatch(setSingleFormField('from', selected));
            setFromInput(`${selected.city} (${selected.iata})`);
          }}
        />
      </div>

      <div className={styles.inputWrapper} ref={toInputRef}>
        <div className={styles.hideOnMobile}>
          <TextInput
            placeholder="City or airport"
            name="to"
            title="To"
            type="input"
            value={toInput}
            onChange={(e) => {
              if (!showToPopup) setShowToPopup(true);
              setToInput(e.currentTarget.value);
            }}
            onFocus={() => setShowToPopup(true)}
            error={!!toError}
          />
        </div>
        <div className={styles.showOnMobile}>
          <ButtonInput
            title="To"
            placeholder="To"
            value={toInput}
            onClick={() => setShowToPopup(true)}
            error={!!toError}
          />
        </div>
        <AirportsPopup
          title="To"
          onClosePress={() => setShowToPopup(false)}
          show={showToPopup}
          inputValue={toInput}
          setInputValue={setToInput}
          onSelect={(selected) => {
            setShowToPopup(false);
            dispatch(setSingleFormField('to', selected));
            setToInput(`${selected.city} (${selected.iata})`);
          }}
        />
      </div>
    </>
  );
};

export default FromToInputs;
