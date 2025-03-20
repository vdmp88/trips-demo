'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setLanguage } from '@/features/locale/localeSlice';
import {
  getUserLocale,
  setUserLocale,
} from '@/features/locale/services/locale';
import { Locale } from '@/i18n/config';
import { useAppSelector } from '@/hooks/hooks';

export function useLanguage() {
  const dispatch = useDispatch();
  const language = useAppSelector((state: RootState) => state.locale.language);

  useEffect(() => {
    const syncLanguage = async () => {
      try {
        const userLocale = await getUserLocale();
        dispatch(setLanguage(userLocale as Locale));
      } catch (error) {
        console.error('Error syncing language:', error);
      }
    };

    syncLanguage();
  }, [dispatch]);

  const updateLanguage = async (newLanguage: Locale) => {
    try {
      dispatch(setLanguage(newLanguage));
      await setUserLocale(newLanguage);
    } catch (error) {
      console.error('Error setting language:', error);
    }
  };

  return { language, setLanguage: updateLanguage };
}
