import { ButtonHTMLAttributes } from 'react';
import styles from './Header.module.css';

const HeaderButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => (
  <button {...props} type="button" className={styles.headerButton}>
    {props.children}
  </button>
);

export default HeaderButton;
