'use client';

import styles from './SearchForm.module.css';
import { useAppSelector } from '@/hooks/hooks';
import { useMemo, useRef, useState } from 'react';
import { ButtonInput } from '@/features/searchForm/ui/Input/Input';
import useOutsideClick from '@/hooks/useOutsideClick';
import TravellersPopup from '@/features/searchForm/ui/TravellersPopup/TravellersPopup';

const TravellersInput: React.FC = () => {
  const travellers = useAppSelector((state) => state.searchForm.travellers);

  const travellersPopupRef = useRef<HTMLDivElement>(null);

  const [showTravellersPopup, setShowTravellersPopup] = useState(false);

  const travellersButtonValue = useMemo(() => {
    const { adults, infants, children, classType } = travellers;

    return `${adults > 0 ? `${adults} Adults` : ''}${
      children > 0 ? `, ${children} Children` : ''
    }${infants > 0 ? `, ${infants} Infants` : ''}, ${classType}`;
  }, [travellers]);

  useOutsideClick([travellersPopupRef], () => {
    setShowTravellersPopup(false);
  });
  return (
    <div className={styles.inputWrapper} ref={travellersPopupRef}>
      <ButtonInput
        placeholder="Choose"
        name="depart"
        title="Travellers and cabin class"
        value={travellersButtonValue}
        type="button"
        onClick={() => setShowTravellersPopup(true)}
      />
      <TravellersPopup
        show={showTravellersPopup}
        onSave={() => setShowTravellersPopup(false)}
        onClose={() => setShowTravellersPopup(false)}
      />
    </div>
  );
};

export default TravellersInput;
