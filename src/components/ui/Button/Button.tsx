import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';
import classNames from 'classnames';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  isExternal?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  isExternal = false,
}) => {
  const buttonClasses = classNames(styles.button, styles[variant], className);

  if (href) {
    if (isExternal) {
      return (
        <a
          href={href}
          className={buttonClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    } else {
      return (
        <Link href={href} passHref legacyBehavior>
          <a className={buttonClasses}>{children}</a>
        </Link>
      );
    }
  }

  return (
    <button type={type} className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};
