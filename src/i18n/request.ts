import { getRequestConfig } from 'next-intl/server';
import { getUserLocale } from '@/features/locale/services/locale';
import { defaultLocale } from '@/i18n/config';

export default getRequestConfig(async () => {
  const locale = await getUserLocale();

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(
      `Translation file for "${locale}" not found. Falling back to "${defaultLocale}".`
    );
    messages = (await import(`../../messages/${defaultLocale}.json`)).default;
  }

  return {
    locale,
    messages,
  };
});
