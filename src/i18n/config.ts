export type Locale = (typeof locales)[number];

export const locales = [
  'en-US',
  'en-GB',
  'ru',
  'zh-CN',
  'de',
  'uk',
  'es',
  'fr',
] as const;
export const defaultLocale: Locale = 'en-GB';
