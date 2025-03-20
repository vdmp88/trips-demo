import styles from './TravellersPopup.module.css';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  SearchForm,
  setTravellersCount,
} from '@/features/searchForm/store/searchFormSlice';

type Props = {
  title: string;
  subtitle: string;
  disabledAt: number;
  traveller: keyof Omit<SearchForm['travellers'], 'classType'>;
};

const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
  >
    <path d="M8.5 7V7.5H9H15C15.1326 7.5 15.2598 7.55268 15.3536 7.64645C15.4473 7.74021 15.5 7.86739 15.5 8C15.5 8.13261 15.4473 8.25979 15.3536 8.35355C15.2598 8.44732 15.1326 8.5 15 8.5H9H8.5V9V15C8.5 15.1326 8.44732 15.2598 8.35355 15.3536C8.25979 15.4473 8.13261 15.5 8 15.5C7.86739 15.5 7.74021 15.4473 7.64645 15.3536C7.55268 15.2598 7.5 15.1326 7.5 15V9V8.5H7H1C0.867392 8.5 0.740215 8.44732 0.646447 8.35355C0.552678 8.25978 0.5 8.13261 0.5 8C0.5 7.86739 0.552678 7.74022 0.646447 7.64645C0.740215 7.55268 0.867392 7.5 1 7.5H7H7.5V7V1C7.5 0.867392 7.55268 0.740215 7.64645 0.646447C7.74022 0.552678 7.86739 0.5 8 0.5C8.13261 0.5 8.25978 0.552678 8.35355 0.646447C8.44732 0.740215 8.5 0.867392 8.5 1V7Z" />
  </svg>
);

const MinusIcon = () => (
  <svg
    width="16"
    height="2"
    viewBox="0 0 16 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.icon}
  >
    <path d="M1 0.5H15C15.1326 0.5 15.2598 0.552679 15.3536 0.646447C15.4473 0.740214 15.5 0.867391 15.5 1C15.5 1.13261 15.4473 1.25979 15.3536 1.35355C15.2598 1.44732 15.1326 1.5 15 1.5H1C0.867392 1.5 0.740215 1.44732 0.646447 1.35355C0.552678 1.25978 0.5 1.13261 0.5 1C0.5 0.867392 0.552678 0.740215 0.646447 0.646447C0.740215 0.552678 0.867392 0.5 1 0.5Z" />
  </svg>
);

const TravellersItem: React.FC<Props> = ({
  traveller,
  disabledAt,
  title,
  subtitle,
}) => {
  const count = useAppSelector(
    (state) => state.searchForm.travellers[traveller]
  );
  const dispatch = useAppDispatch();
  return (
    <div className={styles.travellersItem}>
      <div className={styles.travellersItemInfo}>
        <span className={styles.travellersItemTitle}>{title}</span>
        <span className={styles.travellersItemSubtitle}>{subtitle}</span>
      </div>
      <div className={styles.travellersItemControls}>
        <button
          className={styles.travellersItemControl}
          disabled={count <= disabledAt}
          onClick={() => {
            dispatch(
              setTravellersCount({
                traveller,
                count: count - 1,
              })
            );
          }}
        >
          <MinusIcon />
        </button>
        <span className={styles.travellersItemValue}>{count}</span>
        <button
          className={styles.travellersItemControl}
          onClick={() => {
            dispatch(
              setTravellersCount({
                traveller,
                count: count + 1,
              })
            );
          }}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default TravellersItem;
