import Select from '@/components/ui/Select';
import { setUserLocale } from '@/features/locale/services/locale';
import { useLocale } from 'next-intl';
import HeaderButton from '@/components/layout/Header/HeaderButton';
import Image from 'next/image';
import styles from '@/components/layout/Header/Header.module.css';
import { Typography } from '@/components/ui/Typography/Typography';
import { Language, Languages } from '@/features/locale/config';

export default function LocaleSwitcher() {
  const locale = useLocale();

  const selectedLocale =
    Languages.find((lang) => lang.value === locale) ?? Languages[0];

  const renderItem = (lang: Language) => (
    <span className={styles.selectItem}>
      {lang.icon && (
        <Image
          src={`/locale/${lang.icon}.png`}
          alt={lang.label}
          width={24}
          height={24}
        />
      )}
      <Typography text={lang.label} variant="semiBold14" />
    </span>
  );

  return (
    <Select
      data={Languages}
      value={selectedLocale}
      onChange={(newLocale) => setUserLocale(newLocale.value)}
      renderItem={renderItem}
    >
      <HeaderButton>
        <Image
          src="/svg/localeSwitch.svg"
          alt="locale switcher"
          width={24}
          height={24}
        />
      </HeaderButton>
    </Select>
  );
}
