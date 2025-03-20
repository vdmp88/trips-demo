import { Airport } from '@/features/searchForm/ui/AirportsPopup/AirportsPopup';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SingleForm = {
  from: Airport | null;
  to: Airport | null;
  departDate: string | null;
  returnDate: string | null;
  tripType: 'oneWay' | 'round';
};

export type SearchForm = {
  travellers: {
    adults: number;
    children: number;
    infants: number;
    classType: 'economy' | 'premium';
  };
  multiCity: boolean;
  singleForm: SingleForm;
  singleFormErrors: Partial<Record<keyof SingleForm, string>>;
  multiForm: {
    from: string;
    to: string;
    departDate: string;
  }[];
};

const initialState: SearchForm = {
  travellers: {
    adults: 1,
    children: 0,
    infants: 0,
    classType: 'economy',
  },
  multiCity: false,
  singleForm: {
    from: null,
    to: null,
    departDate: null,
    returnDate: null,
    tripType: 'round',
  },
  singleFormErrors: {},
  multiForm: [],
};

type SingleFormFieldValue<Field extends keyof SearchForm['singleForm']> =
  SearchForm['singleForm'][Field];

const setSingleFormFieldType = 'searchForm/setSingleFormField';
export const setSingleFormField = <F extends keyof SearchForm['singleForm']>(
  field: F,
  value: SingleFormFieldValue<F>
) => ({
  type: setSingleFormFieldType,
  payload: {
    field,
    value,
  },
});
setSingleFormField.type = setSingleFormFieldType;

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    setClassType: (
      state,
      action: PayloadAction<SearchForm['travellers']['classType']>
    ) => {
      state.travellers.classType = action.payload;
    },
    setTravellersCount: (
      state,
      action: PayloadAction<{
        traveller: keyof Omit<SearchForm['travellers'], 'classType'>;
        count: number;
      }>
    ) => {
      state.travellers[action.payload.traveller] = action.payload.count;
    },
    setMultiCity: (state, action: PayloadAction<boolean>) => {
      state.multiCity = action.payload;
    },
    setSingleFormError: (
      state,
      action: PayloadAction<{ field: keyof SingleForm; error: string }>
    ) => {
      state.singleFormErrors[action.payload.field] = action.payload.error;
    },
    clearSingleFormError: (state, action: PayloadAction<keyof SingleForm>) => {
      delete state.singleFormErrors[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setSingleFormField, (state, action) => {
      // @ts-expect-error redux toolkit types are not smart enough to infer this
      state.singleForm[action.payload.field] = action.payload.value;
    });
  },
});

export const {
  setMultiCity,
  setTravellersCount,
  setClassType,
  setSingleFormError,
  clearSingleFormError,
} = searchFormSlice.actions;
export default searchFormSlice.reducer;
