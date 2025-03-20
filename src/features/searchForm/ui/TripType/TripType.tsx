import { InputHTMLAttributes } from 'react';
import styles from './TripType.module.css';
import { Typography } from '@/components/ui/Typography/Typography';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  placeholder: string;
  name: string;
};

const TripType: React.FC<Props> = ({ placeholder, ...inputProps }) => (
  <label className={styles.radio}>
    <input type="radio" {...inputProps} className={styles.radioInput} />
    <div className={styles.radioCircle} />
    <Typography
      text={placeholder}
      variant="medium16"
      className={styles.radioPlaceholder}
    />
  </label>
);
export default TripType;
