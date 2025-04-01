import { useEffect, useState } from 'react';

export const useMediaQuery = (
  type: 'max' | 'min',
  point: number,
  initial: boolean = false
): boolean => {
  const [matches, setMatches] = useState<boolean>(initial);

  useEffect(() => {
    const query = `(${type}-width: ${point}px)`;
    const matchMedia = window.matchMedia(query);

    const handleChange = () => {
      setMatches(window.matchMedia(query).matches);
    };

    handleChange();

    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener('change', handleChange);
    }

    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener('change', handleChange);
      }
    };
  }, [type, point]);

  return matches;
};
