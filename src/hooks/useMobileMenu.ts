import { useState } from 'react';

export const useMobileMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return { isMenuOpen, toggleMenu };
};
