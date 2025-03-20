import classNames from '@/modules/classNames';
import { PropsWithChildren } from 'react';
import styles from './Section.module.css';

type Props = {
  className?: string;
};

const Section: React.FC<PropsWithChildren<Props>> = ({
  className,
  children,
}) => <div className={classNames([className, styles.section])}>{children}</div>;

export default Section;
