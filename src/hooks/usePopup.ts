import { FocusEvent, SyntheticEvent, useRef, useState } from 'react';

type UsePopupConfig = {
  onShowChange?: (show: boolean) => void;
};

const usePopup = <
  TriggerElem extends HTMLElement,
  PopupElem extends HTMLElement,
>(
  config?: UsePopupConfig
) => {
  const [show, setShow] = useState(false);

  const triggerRef = useRef<TriggerElem>(null);
  const popupRef = useRef<PopupElem>(null);

  const onTriggerFocus = () => {
    setShow(true);
    config?.onShowChange?.(true);
  };

  const onTriggerBlur = (
    e: FocusEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    if (!popupRef?.current?.contains(e.relatedTarget)) {
      config?.onShowChange?.(false);
      setShow(false);
    }
  };

  const preventDefault = (
    e: SyntheticEvent<HTMLButtonElement | HTMLInputElement>
  ) => {
    e.preventDefault();
  };

  const onTriggerClick = () => {
    if (show) {
      triggerRef.current?.blur();
    } else {
      triggerRef.current?.focus();
    }
  };

  return {
    onTriggerFocus,
    onTriggerBlur,
    triggerRef,
    onTriggerMouseDown: preventDefault,
    onTriggerClick,
    popupRef,
    show,
    setShow,
  };
};

export default usePopup;
