import { Locale } from '@/i18n/config';

export type Language = { value: Locale; label: string; icon: string };

export const Languages: Language[] = [
  {
    value: 'en-GB',
    label: 'English (UK)',
    icon: 'en-GB',
  },
  {
    value: 'en-US',
    label: 'English (US)',
    icon: 'en-US',
  },
  {
    value: 'zh-CN',
    label: '简体中文',
    icon: 'zh-CN',
  },
  {
    value: 'de',
    label: 'Deutsch',
    icon: 'de',
  },
  {
    value: 'uk',
    label: 'Українська',
    icon: 'uk',
  },
  {
    value: 'ru',
    label: 'Русский',
    icon: 'ru',
  },
  {
    value: 'es',
    label: 'Español',
    icon: 'es',
  },
  {
    value: 'fr',
    label: 'Français',
    icon: 'fr',
  },
];

export type Currency = { label: string; value: string };

export const Currencies: Currency[] = [
  { value: 'NGN', label: 'Nigerian naira' },
  { value: 'USD', label: 'US dollar' },
  { value: 'EUR', label: 'Euro' },
  { value: 'UAH', label: 'Ukrainian hryvnia' },
  { value: 'RUB', label: 'Russian ruble' },
  { value: 'CNY', label: 'Chinese yuan' },
  { value: 'PLN', label: 'Polish zloty' },
  { value: 'GBP', label: 'British pound' },
  { value: 'ILS', label: 'Israeli new shekel' },
  { value: 'INR', label: 'Indian rupee' },
  { value: 'KES', label: 'Kenyan shilling' },
  { value: 'KZT', label: 'Kazakhstani tenge' },
  { value: 'MDL', label: 'Moldovan leu' },
  { value: 'AZN', label: 'Azerbaijani manat' },
  { value: 'BYN', label: 'Belarusian ruble' },
];
