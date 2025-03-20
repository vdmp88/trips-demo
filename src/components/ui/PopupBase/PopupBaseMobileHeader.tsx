import classNames from 'classnames';
import styles from './PopupBase.module.css';
import CloseIcon from '@/icons/close.svg';
import Image from 'next/image';

type Props = {
  onClosePress: () => void;
  title: string;
  className?: string;
};

const PopupBaseMobileHeader: React.FC<Props> = ({
  onClosePress,
  title,
  className,
}) => (
  <div className={classNames(styles.mobileHeader, className)}>
    <span className={styles.title}>{title}</span>
    <button className={styles.closeButton} onClick={onClosePress}>
      <Image src={CloseIcon} alt="close-calendar-popup" />
    </button>
  </div>
);

export default PopupBaseMobileHeader;
