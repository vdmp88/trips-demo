import { PropsWithChildren } from 'react';
import styles from './Select.module.css';
import classNames from '@/modules/classNames';

type Props = {
  className?: string;
};

const BaseSelectItem: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => <div className={classNames([styles.item, className])}>{children}</div>;

export default BaseSelectItem;
