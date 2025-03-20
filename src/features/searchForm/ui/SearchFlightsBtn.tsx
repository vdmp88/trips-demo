import { Button } from '@/components/ui/Button/Button';
import {
  clearSingleFormError,
  SearchForm,
  setSingleFormError,
} from '@/features/searchForm/store/searchFormSlice';
import { useAppDispatch, useAppStore } from '@/hooks/hooks';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';

// type Props = {};

const validate = (values: SearchForm['singleForm']) => {
  const errors: SearchForm['singleFormErrors'] = {};

  if (!values.from) {
    errors.from = 'Please select a city or airport';
  } else {
    errors.from = undefined;
  }

  if (!values.to) {
    errors.to = 'Please select a city or airport';
  } else {
    errors.to = undefined;
  }

  if (!values.departDate) {
    errors.departDate = 'Please select a depart date';
  } else {
    errors.departDate = undefined;
  }

  if (values.tripType === 'round' && !values.returnDate) {
    errors.returnDate = 'Please select a return date';
  } else {
    errors.returnDate = undefined;
  }

  return errors;
};

const SearchFlightsBtn: React.FC = () => {
  const store = useAppStore();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSearchFlights = () => {
    const state = store.getState().searchForm;
    const form = state.singleForm;

    const errors = validate(form);

    let invalid = false;

    (Object.keys(errors) as (keyof SearchForm['singleFormErrors'])[]).forEach(
      (field) => {
        const errMsg = errors[field];
        if (errMsg) {
          invalid = true;
          dispatch(setSingleFormError({ field, error: errMsg }));
        } else {
          dispatch(clearSingleFormError(field));
        }
      }
    );

    if (!invalid) {
      const departureDate = form.departDate
        ? format(new Date(form.departDate), 'yyyy-MM-dd')
        : '';
      const returnDate =
        form.tripType === 'round' && form.returnDate
          ? format(new Date(form.returnDate), 'yyyy-MM-dd')
          : undefined;

      const searchParams = new URLSearchParams({
        departureCode: form.from?.iata || '',
        departureDate,
        destinationCode: form.to?.iata || '',
        ...(returnDate ? { returnDate } : {}),
        cabinClass: state?.travellers.classType.toUpperCase(),
        adults: state.travellers.adults.toString(),
        children: state.travellers.children.toString(),
        infant: state.travellers.infants.toString(),
        language: 'en',
        currency: 'USD',
      }).toString();

      router.push(`/flights?${searchParams}`);
    }
  };

  return <Button onClick={onSearchFlights}>Search flights</Button>;
};

export default SearchFlightsBtn;
