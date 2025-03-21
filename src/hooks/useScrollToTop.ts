import { useCallback, useEffect, useState } from 'react';

interface UseScrollToTopOptions {
  threshold?: number;
  smooth?: boolean;
}

export const useScrollToTop = ({
  threshold = 200,
  smooth = true,
}: UseScrollToTopOptions = {}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const checkScrollTop = useCallback(() => {
    if (!showScrollButton && window.pageYOffset > threshold) {
      setShowScrollButton(true);
    } else if (showScrollButton && window.pageYOffset <= threshold) {
      setShowScrollButton(false);
    }
  }, [showScrollButton, threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto',
    });
  }, [smooth]);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [checkScrollTop]);

  return { showScrollButton, scrollToTop };
};
