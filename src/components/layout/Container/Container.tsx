import classNames from '@/modules/classNames';
import { PropsWithChildren } from 'react';
import styles from './Container.module.css';

type Props = {
  className?: string;
};

const Container: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => (
  <div className={classNames([className, styles.container])}>{children}</div>
);

export default Container;
