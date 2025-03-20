import { forwardRef, HTMLAttributes, PropsWithChildren } from 'react';
import styles from './PopupBase.module.css';
import classNames from 'classnames';

type Props = HTMLAttributes<HTMLDivElement>;

const PopupBase = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(
  ({ className, children }, ref) => (
    <div ref={ref} className={classNames(styles.popup, className)}>
      {children}
    </div>
  )
);

PopupBase.displayName = 'PopupBase';

export default PopupBase;
