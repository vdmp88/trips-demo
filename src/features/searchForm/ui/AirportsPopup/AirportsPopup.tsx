import PopupBase from '@/components/ui/PopupBase/PopupBase';
import styles from './AirportsPopup.module.css';
import BaseSelectItem from '@/components/ui/Select/BaseSelectItem';
import PlaneIcon from '@/icons/plane.svg';
import Image from 'next/image';
import airports from '../../airports.json';
import classNames from 'classnames';
import PopupBaseMobileHeader from '@/components/ui/PopupBase/PopupBaseMobileHeader';
import Container from '@/components/layout/Container';

export type Airport = {
  city: string;
  iata: string;
  airport: string;
  country: string;
};

type Props = {
  show: boolean;
  inputValue: string;
  setInputValue: (value: string) => void;
  onSelect: (value: Airport) => void;
  title: string;
  onClosePress: () => void;
};

const AirportsPopup: React.FC<Props> = ({
  inputValue,
  setInputValue,
  onClosePress,
  onSelect,
  show,
  title,
}) => {
  if (!show) return null;

  const data = inputValue
    ? airports.filter((item) =>
        `${item.city} (${item.iata}) ${item.airport} ${item.country}`
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
    : [];

  return (
    <PopupBase
      className={classNames(styles.popup, !data.length && styles.popupEmpty)}
    >
      <Container className={classNames(styles.divider, styles.showOnMobile)}>
        <PopupBaseMobileHeader title={title} onClosePress={onClosePress} />
      </Container>
      <Container className={classNames(styles.showOnMobile)}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            placeholder={title}
          />
        </div>
      </Container>
      <div className={styles.list}>
        {data.map((item) => (
          <button key={item.iata} onClick={() => onSelect(item)}>
            <BaseSelectItem className={styles.item}>
              <Image src={PlaneIcon} width={24} alt="plane-icon" />
              <div className={styles.itemContent}>
                <span className={styles.itemTitle}>
                  {item.city} ({item.iata})
                </span>
                <span className={styles.itemSubtitle}>{item.country}</span>
              </div>
            </BaseSelectItem>
          </button>
        ))}
      </div>
    </PopupBase>
  );
};

export default AirportsPopup;
