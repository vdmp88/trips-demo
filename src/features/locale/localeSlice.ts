import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Currencies, Languages, Currency } from '@/features/locale/config';
import { Locale } from '@/i18n/config';

interface LocaleState {
  currency: Currency;
  language: Locale;
}

const initialState: LocaleState = {
  currency: Currencies[0],
  language: Languages[0].value,
};

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<Locale>) => {
      state.language = action.payload;
    },
  },
});

export const { setCurrency, setLanguage } = localeSlice.actions;
export default localeSlice.reducer;
