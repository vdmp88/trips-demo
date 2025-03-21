import {
  ButtonHTMLAttributes,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
} from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';

type PropsBase = {
  placeholder?: string;
  value: string;
  title: string;
  error?: boolean;
};

type InputProps = PropsBase & InputHTMLAttributes<HTMLInputElement>;
type ButtonProps = PropsBase & ButtonHTMLAttributes<HTMLButtonElement>;

const Base: React.FC<PropsWithChildren<{ title: string; error?: boolean }>> = ({
  title,
  error,
  children,
}) => (
  <label
    className={classNames(
      styles.input,
      'search-form-input',
      error && styles.error
    )}
  >
    <span className={classNames(styles.inputTitle, 'search-form-input__title')}>
      {title}
    </span>
    {children}
  </label>
);

const TextInput = forwardRef(
  (
    { title, placeholder, value, error, ...restProps }: InputProps,
    ref: Ref<HTMLInputElement>
  ) => (
    <Base title={title} error={error}>
      <input
        {...restProps}
        ref={ref}
        type="text"
        className={styles.inputField}
        value={value}
        placeholder={placeholder}
        autoComplete="off"
      />
    </Base>
  )
);

TextInput.displayName = 'TextInput';

const ButtonInput = forwardRef(
  (
    { title, placeholder, value, error, ...restProps }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => (
    <Base title={title} error={error}>
      <button
        {...restProps}
        type="button"
        className={styles.inputButton}
        ref={ref}
      >
        {value.trim() ? (
          value
        ) : (
          <span className={styles.inputPlaceholder}>{placeholder}</span>
        )}
      </button>
    </Base>
  )
);

ButtonInput.displayName = 'ButtonInput';

export { TextInput, ButtonInput };
