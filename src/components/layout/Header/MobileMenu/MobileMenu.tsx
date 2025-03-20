import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MobileMenu.module.css';
import { useCurrency } from '@/hooks/useCurrency';
import { Currencies, Languages, Currency } from '@/features/locale/config';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import { Typography } from '@/components/ui/Typography/Typography';
import MenuButton from '@/components/layout/Header/MobileMenu/MenuButton';
import { Locale } from '@/i18n/config';

enum Screen {
  Main = 'main',
  Currency = 'currency',
  Language = 'language',
}

type MobileMenuProps = {
  onClose: () => void;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ onClose }) => {
  const { currency, setCurrency } = useCurrency();
  const { language, setLanguage } = useLanguage();

  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.Main);

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderLanguageButtons = (
    items: typeof Languages,
    currentValue: Locale,
    setter: (value: Locale) => void
  ) => {
    return items.map((item) => (
      <MenuButton
        key={item.value}
        label={item.label}
        value={item.value}
        iconPath={item.icon}
        isActive={item.value === currentValue}
        onClick={() => {
          setter(item.value);
          navigateTo(Screen.Main);
        }}
      />
    ));
  };

  const renderCurrencyButtons = (
    items: typeof Currencies,
    currentValue: string,
    setter: (value: Currency) => void
  ) => {
    return items.map((item) => (
      <MenuButton
        key={item.value}
        label={item.label}
        value={item.value}
        subTitle={item.value}
        isActive={item.value === currentValue}
        onClick={() => {
          setter(item);
          navigateTo(Screen.Main);
        }}
      />
    ));
  };

  const screens = {
    main: (
      <div key="main" className={styles.mainScreen}>
        <div className={styles.localeWrapper}>
          <Typography variant="semiBold18" text="Language" tag="h4" />
          <div className={styles.menuButtonWrapper}>
            <Image
              className={styles.flag}
              src={`/locale/${language}.png`}
              alt={language}
              width={24}
              height={24}
            />
            <MenuButton
              label={
                Languages.find((lang) => lang.value === language)?.label || ''
              }
              value={language}
              isActive
              onClick={() => navigateTo(Screen.Language)}
            />
          </div>
        </div>
        <div className={styles.localeWrapper}>
          <Typography variant="semiBold18" text="Currency" tag="h4" />
          <div className={styles.menuButtonWrapper}>
            <div className={styles.currencyValue}>
              <Typography variant="medium16" text={currency.value} tag="span" />
            </div>
            <MenuButton
              label={currency.label}
              value={currency.value}
              isActive
              onClick={() => navigateTo(Screen.Currency)}
            />
          </div>
        </div>
      </div>
    ),
    currency: (
      <div key="currency" className={styles.subScreen}>
        {renderCurrencyButtons(Currencies, currency.value, setCurrency)}
      </div>
    ),
    language: (
      <div key="language" className={styles.subScreen}>
        {renderLanguageButtons(Languages, language, setLanguage)}
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
      className={styles.mobileMenu}
    >
      <div className={styles.mobileNavigationHeader}>
        {currentScreen !== 'main' && (
          <button
            onClick={() => navigateTo(Screen.Main)}
            className={styles.backButton}
          >
            <Image
              src="/svg/backButton.svg"
              alt="Back"
              width={24}
              height={24}
            />
          </button>
        )}
        <button onClick={onClose} className={styles.closeButton}>
          <Image
            src="/svg/closeButton.svg"
            alt="Close"
            width={24}
            height={24}
          />
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'tween', duration: 0.2 }}
          className={styles.screenContainer}
        >
          {screens[currentScreen]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default MobileMenu;
