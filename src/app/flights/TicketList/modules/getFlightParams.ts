import { CabinClass, SearchParams } from '@/features/flights/flightSlice';
import { ReadonlyURLSearchParams } from 'next/navigation';

const getFlightParams = (searchParams: ReadonlyURLSearchParams) => {
  const flightParams: SearchParams = {
    departureCode: searchParams.get('departureCode') || '',
    departureDate: searchParams.get('departureDate') || '',
    destinationCode: searchParams.get('destinationCode') || '',
    cabinClass: searchParams.get('cabinClass') as CabinClass,
    adults: Number(searchParams.get('adults')) || 1,
    children: Number(searchParams.get('children')) || 0,
    infant: Number(searchParams.get('infant')) || 0,
    language: searchParams.get('language') || 'en',
    currency: searchParams.get('currency') || 'USD',
  };

  const returnDate = searchParams.get('returnDate');
  if (returnDate) {
    flightParams.returnDate = returnDate;
  }
  return flightParams;
};

export default getFlightParams;
