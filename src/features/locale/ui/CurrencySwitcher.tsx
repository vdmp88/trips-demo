import HeaderButton from '@/components/layout/Header/HeaderButton';
import Select from '@/components/ui/Select';
import { Typography } from '@/components/ui/Typography/Typography';
import { Currencies, Currency } from '@/features/locale/config';
import styles from '@/components/layout/Header/Header.module.css';
import { useCurrency } from '@/hooks/useCurrency';

export const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();

  const renderCurrency = (currency: Currency) => (
    <span className={styles.selectItem}>
      <Typography variant="medium16" text={currency.value} />
      <Typography text={currency.label} variant="semiBold14" />
    </span>
  );

  return (
    <Select
      data={Currencies}
      value={currency}
      onChange={(newCurrency) => setCurrency(newCurrency)}
      renderItem={renderCurrency}
    >
      <HeaderButton>
        <Typography variant="semiBold18" text={currency.value} />
      </HeaderButton>
    </Select>
  );
};
