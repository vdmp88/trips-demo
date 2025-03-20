'use client';

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { setCurrency } from '@/features/locale/localeSlice';
import { Currency } from '@/features/locale/config';
import {
  getUserCurrency,
  setUserCurrency,
} from '@/features/locale/services/locale';

export function useCurrency() {
  const dispatch = useDispatch();
  const currency = useSelector((state: RootState) => state.locale.currency);

  useEffect(() => {
    const syncCurrency = async () => {
      try {
        const userCurrency = await getUserCurrency();
        dispatch(setCurrency(userCurrency));
      } catch (error) {
        console.error('Error syncing currency:', error);
      }
    };

    syncCurrency();
  }, [dispatch]);

  const updateCurrency = async (newCurrency: Currency) => {
    try {
      dispatch(setCurrency(newCurrency));
      await setUserCurrency(newCurrency);
    } catch (error) {
      console.error('Error setting currency:', error);
    }
  };

  return { currency, setCurrency: updateCurrency };
}
