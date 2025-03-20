import { Typography } from '@/components/ui/Typography/Typography';
import classNames from '@/modules/classNames';
import styles from './Tabs.module.css';
import { ButtonHTMLAttributes } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  active: boolean;
  text: string;
};

const BaseTabButton: React.FC<Props> = ({ text, active, ...buttonProps }) => (
  <button
    className={classNames([styles.tabButton, active && styles.activeTab])}
    {...buttonProps}
  >
    <Typography variant="semiBold14" text={text} />
  </button>
);

export default BaseTabButton;
