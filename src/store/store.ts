import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice';
import searchFormSlice from '@/features/searchForm/store/searchFormSlice';
import localeSlice from '@/features/locale/localeSlice';
import flightSlice from '@/features/flights/flightSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      locale: localeSlice,
      searchForm: searchFormSlice,
      flights: flightSlice,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
