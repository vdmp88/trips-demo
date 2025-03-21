import { useAppSelector } from '@/hooks/hooks';
import styles from './SearchForm.module.css';
import { SingleForm } from '@/features/searchForm/store/searchFormSlice';
import { formatDateForInputShort } from '@/features/searchForm/modules/formatDateForInput';
import Image from 'next/image';

type Props = {
  onClick: () => void;
};

const getFromToString = (from: SingleForm['from'], to: SingleForm['to']) => {
  let fromToString = 'Fetching airports...';
  if (from) {
    fromToString = `${from.city} (${from.iata})`;
  }
  if (to) {
    fromToString += ` - ${to.city} (${to.iata})`;
  }
  return fromToString;
};

const getDatesString = (
  departDate: SingleForm['departDate'],
  returnDate: SingleForm['returnDate']
) => {
  let datesString = 'Fetching dates...';

  if (departDate) {
    datesString = formatDateForInputShort(departDate);
  }

  if (returnDate) {
    datesString += ` - ${formatDateForInputShort(returnDate)}`;
  }
  return datesString;
};

const ShortSearchButton: React.FC<Props> = ({ onClick }) => {
  const from = useAppSelector((state) => state.searchForm.singleForm.from);
  const to = useAppSelector((state) => state.searchForm.singleForm.to);

  const departDate = useAppSelector(
    (state) => state.searchForm.singleForm.departDate
  );
  const returnDate = useAppSelector(
    (state) => state.searchForm.singleForm.returnDate
  );

  return (
    <button className={styles.shortenedSearchButton} onClick={onClick}>
      <span className={styles.shortenedSearchButtonContent}>
        <span className={styles.shortenedSearchButtonTitle}>
          {getFromToString(from, to)}
        </span>
        <span className={styles.shortenedSearchButtonSubtitle}>
          {getDatesString(departDate, returnDate)}
        </span>
      </span>
      <Image
        src="/svg/search.svg"
        width={24}
        height={24}
        alt="Expand search button icon"
      />
    </button>
  );
};

export default ShortSearchButton;
