import React, { JSX } from 'react';
import styles from './Typography.module.css';

const variantClasses = {
  h1: styles.typographyH1,
  h2: styles.typographyH2,
  h3: styles.typographyH3,
  subtitle1: styles.subtitle1,
  subtitle2: styles.subtitle2,
  semiBold18: styles.semiBold18,
  medium18: styles.medium18,
  regular18: styles.regular18,
  semiBold16: styles.semiBold16,
  medium16: styles.medium16,
  regular16: styles.regular16,
  semiBold14: styles.semiBold14,
  medium14: styles.medium14,
  regular14: styles.regular14,
  semiBold12: styles.semiBold12,
  medium12: styles.medium12,
  regular12: styles.regular12,
  uppercase: styles.uppercase,
} as const;

type TypographyVariant = keyof typeof variantClasses;

type TypographyProps = {
  tag?: keyof JSX.IntrinsicElements;
  variant?: TypographyVariant;
  text: string;
  className?: string;
};

export const Typography: React.FC<TypographyProps> = ({
  tag = 'span',
  variant = 'h1',
  text,
  className = '',
  ...props
}) => {
  const Tag = tag;
  const variantClass = variantClasses[variant];

  return (
    <Tag
      className={`${variantClass} ${className} ${styles.typography}`}
      {...props}
    >
      {text}
    </Tag>
  );
};
