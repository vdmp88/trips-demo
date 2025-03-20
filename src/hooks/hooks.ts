import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { Store } from '@reduxjs/toolkit';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
type StoreType = Store<RootState>;
export const useAppStore: () => StoreType = useStore;
