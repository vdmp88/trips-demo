import {
  ButtonHTMLAttributes,
  forwardRef,
  InputHTMLAttributes,
  PropsWithChildren,
  Ref,
} from 'react';
import styles from './Input.module.css';
import classNames from 'classnames';
import Image from 'next/image';

type PropsBase = {
  placeholder?: string;
  value: string;
  title: string;
  error?: boolean;
  onClear?: () => void;
};

type InputProps = PropsBase & InputHTMLAttributes<HTMLInputElement>;
type ButtonProps = PropsBase & ButtonHTMLAttributes<HTMLButtonElement>;

const Base: React.FC<
  PropsWithChildren<{ title: string; error?: boolean; showClear: boolean }>
> = ({ title, error, children, showClear }) => (
  <label
    className={classNames(
      styles.input,
      'search-form-input',
      showClear && styles.showClear,
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
    <Base title={title} error={error} showClear={false}>
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
    { title, placeholder, value, error, onClear, ...restProps }: ButtonProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    const showClear = onClear != null && !!value.trim();
    return (
      <Base title={title} error={error} showClear={showClear}>
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

        {showClear && (
          <button onClick={onClear} className={styles.clearButton}>
            <Image
              width={24}
              height={24}
              src="/svg/closeButton.svg"
              alt="clear"
            />
          </button>
        )}
      </Base>
    );
  }
);

ButtonInput.displayName = 'ButtonInput';

export { TextInput, ButtonInput };
