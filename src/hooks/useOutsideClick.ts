import { RefObject, useEffect } from 'react';

const useOutsideClick = (
  HTMLElementsToAvoid: RefObject<HTMLElement | null>[],
  callback: () => void
) => {
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        HTMLElementsToAvoid.every(
          (htmlElem) => !htmlElem?.current?.contains(e.target as Node)
        )
      ) {
        callback();
      }
    };
    document.addEventListener('mouseup', onDocClick);
    return () => {
      document.removeEventListener('mouseup', onDocClick);
    };
  });
};

export default useOutsideClick;
