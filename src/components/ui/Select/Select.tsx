'use client';
import React, { PropsWithChildren } from 'react';
import classNames from '@/modules/classNames';
import Image from 'next/image';
import styles from './Select.module.css';
import usePopup from '@/hooks/usePopup';
import BaseSelectItem from '@/components/ui/Select/BaseSelectItem';

export type SelectValue = {
  label: string;
  value: string;
};

type Props<D extends SelectValue[] | readonly SelectValue[]> = {
  placeholder?: string;
  initialValue?: string;
  data: D;
  value: D[number] | null;
  onChange: (value: D[number]) => void;
  renderItem?: (item: D[number]) => React.ReactNode;
  onShowChange?: (show: boolean) => void;
};

const Select = <D extends SelectValue[] | readonly SelectValue[]>({
  placeholder = 'Select',
  value,
  data,
  onChange,
  children,
  renderItem,
  onShowChange,
}: PropsWithChildren<Props<D>>) => {
  const {
    onTriggerFocus,
    onTriggerBlur,
    triggerRef,
    onTriggerMouseDown,
    onTriggerClick,
    popupRef,
    setShow,
    show,
  } = usePopup<HTMLButtonElement, HTMLUListElement>({ onShowChange });

  const onSelectValue = (value: SelectValue) => () => {
    onChange(value);
    setShow(false);
    onShowChange?.(false);
  };

  const childrenProps = {
    tabIndex: 0,
    onFocus: onTriggerFocus,
    onBlur: onTriggerBlur,
    ref: triggerRef,
    onMouseDown: onTriggerMouseDown,
    onClick: onTriggerClick,
  };

  return (
    <div className={classNames(['select', styles.select])}>
      {React.isValidElement(children) ? (
        React.cloneElement(children, childrenProps)
      ) : (
        <button className={styles.baseSelect} {...childrenProps} type="button">
          {value?.label || placeholder}
          <Image src="/svg/arrow.svg" height={16} width={16} alt="arrow" />
        </button>
      )}

      {show && data?.length > 0 && (
        <ul
          ref={popupRef}
          className={classNames(['select__menu', styles.menu])}
        >
          {data.map((item) => (
            <li key={item.value}>
              <button
                onBlur={onTriggerBlur}
                onClick={onSelectValue(item)}
                type="button"
                tabIndex={0}
                className={styles.itemButton}
              >
                {typeof renderItem === 'function' ? (
                  renderItem(item)
                ) : (
                  <BaseSelectItem>{item.label}</BaseSelectItem>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
