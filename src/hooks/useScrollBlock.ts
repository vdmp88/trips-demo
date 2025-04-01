import BodyScrollBlocker from '@/modules/bodyScrollBlocker';
import { useEffect } from 'react';

const useScrollBlock = (condition: boolean) => {
  useEffect(() => {
    if (condition) {
      BodyScrollBlocker.block();
    } else {
      BodyScrollBlocker.unblock();
    }

    return () => {
      BodyScrollBlocker.unblock();
    };
  }, [condition]);
};

export default useScrollBlock;
