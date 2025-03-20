'use server';

import { cookies } from 'next/headers';
import { Locale, defaultLocale } from '@/i18n/config';
import { Currencies, Currency } from '@/features/locale/config';

const LOCALE_COOKIE = 'LOCALE';
const CURRENCY_COOKIE = 'CURRENCY';

export async function getUserLocale() {
  return (await cookies()).get(LOCALE_COOKIE)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  (await cookies()).set(LOCALE_COOKIE, locale);
}

export async function setUserCurrency(currency: Currency) {
  (await cookies()).set(CURRENCY_COOKIE, currency.value);
}

export async function getUserCurrency(): Promise<Currency> {
  const currencyValue = (await cookies()).get(CURRENCY_COOKIE)?.value;

  return Currencies.find((c) => c.value === currencyValue) || Currencies[0];
}
