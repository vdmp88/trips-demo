import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeaderButton from '@/components/layout/Header/HeaderButton';
import MobileMenu from '@/components/layout/Header/MobileMenu/MobileMenu';

export const MobileNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = '';
    }

    return () => {
      document.body.style.overflowY = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <HeaderButton onClick={toggleMenu}>
        <Image src="/svg/burger.svg" alt="menu" width={24} height={24} />
      </HeaderButton>
      {isMenuOpen && <MobileMenu onClose={toggleMenu} />}
    </>
  );
};
