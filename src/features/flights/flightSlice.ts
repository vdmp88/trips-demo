/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export type FlightInfo = {
  departureDate: string;
  departureTime: string;
  departureAirport: string;
  arrivalDate: string;
  arrivalTime: string;
  arrivalAirport: string;
  airline: string;
  airlineName: string;
  price: number;
  currency: string;
  directUrl: string;
};

export type OneWayFlightTrip = {
  '@': 'OneWayFlightTrip';
  searchResultId: string;
  flightInfo: FlightInfo;
};

export type RoundFlightTrip = {
  '@': 'RoundFlightTrip';
  searchResultId: string;
  flightInfo: FlightInfo;
  returnFlightInfo: FlightInfo;
  price: number;
  currency: string;
  directUrl: string | null;
};

export type MultiCityFlightTrip = {
  '@': 'MultiCityFlightTrip';
  searchResultId: string;
  flightInfo: FlightInfo[];
  price: number;
  currency: string;
  directUrl: string | null;
};

export type FlightTrip =
  | OneWayFlightTrip
  | RoundFlightTrip
  | MultiCityFlightTrip;

export enum SortOption {
  CHEAPEST = 'CHEAPEST',
  FASTEST = 'FASTEST',
}

export enum CabinClass {
  ECONOMY = 'ECONOMY',
  PREMIUM = 'PREMIUM',
}

type FlightsState = {
  searchId: string | null;
  totalProviders: number;
  checkedProviders: number;
  flightTrips: FlightTrip[];
  isLoading: boolean;
  sortOption: SortOption;
  error: string | null;
  hasInitialResults: boolean;
};

const initialState: FlightsState = {
  searchId: null,
  totalProviders: 0,
  checkedProviders: 0,
  flightTrips: [],
  isLoading: true,
  error: null,
  sortOption: SortOption.CHEAPEST,
  hasInitialResults: false,
};

export type SearchParams = {
  departureCode: string;
  departureDate: string;
  destinationCode: string;
  returnDate?: string | null;
  cabinClass: CabinClass;
  adults: number;
  children: number;
  infant: number;
  language: string;
  currency: string;
};

let eventSource: EventSource | null = null;

export const stopSearch = () => {
  eventSource?.close();
};

const handleFlightEvent = (
  event: MessageEvent<string>,
  dispatch: any,
  eventSource: EventSource | null
) => {
  const rawData = event.data.replace(/^data:\s*/, '').trim();
  const data = JSON.parse(rawData);

  const eventHandlers: Record<string, () => void> = {
    StartedSearchEvent: () =>
      dispatch(
        flightSlice.actions.setSearchStarted({
          searchId: data.searchId,
          totalProviders: data.totalProviders,
        })
      ),

    ProgressSearchEvent: () => {
      dispatch(
        flightSlice.actions.setSearchProgress({
          checkedProviders: data.checkedProviders,
        })
      );
    },

    FoundFlightTripsSearchEvent: () => {
      dispatch(flightSlice.actions.addFlightTrips(data.flightTrips));
    },

    CompletedSearchEvent: () => {
      dispatch(flightSlice.actions.setSearchCompleted());
      eventSource?.close();
    },

    Error: () => {
      dispatch(
        flightSlice.actions.setError(data.message || 'Unknown error occurred')
      );
      eventSource?.close();
    },
  };

  const handler = eventHandlers[data['@']];
  if (handler) {
    handler();
  } else {
    console.warn('Unhandled event type:', data['@']);
  }
};

export const searchFlights = createAsyncThunk<
  void,
  SearchParams,
  { rejectValue: string }
>('flights/searchFlights', async (params, { dispatch, rejectWithValue }) => {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || 'https://api-dev.tripscheck.com';
  const url = `${apiUrl}/v1/search?${new URLSearchParams(params as any).toString()}`;

  try {
    eventSource = new EventSource(url);

    eventSource.onmessage = (event) =>
      handleFlightEvent(event, dispatch, eventSource);

    eventSource.onerror = () => {
      dispatch(flightSlice.actions.setError('Failed to fetch flight data'));
      eventSource?.close();
      throw new Error('EventSource failed');
    };

    return new Promise((resolve, reject) => {
      eventSource!.onerror = () => reject('EventSource connection failed');
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue('An unknown error occurred');
  }
});

const flightSlice = createSlice({
  name: 'flights',
  initialState,
  reducers: {
    setSearchStarted(
      state,
      action: PayloadAction<{ searchId: string; totalProviders: number }>
    ) {
      state.searchId = action.payload.searchId;
      state.totalProviders = action.payload.totalProviders;
      state.isLoading = true;
      state.flightTrips = [];
      state.checkedProviders = 0;
      state.error = null;
    },
    setSearchProgress(
      state,
      action: PayloadAction<{ checkedProviders: number }>
    ) {
      state.checkedProviders = action.payload.checkedProviders;
    },
    addFlightTrips(state, action: PayloadAction<FlightTrip[]>) {
      state.flightTrips = [...state.flightTrips, ...action.payload];
      if (!state.hasInitialResults) {
        state.hasInitialResults = true;
      }
    },
    setSearchCompleted(state) {
      state.isLoading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setSortOption(state, action: PayloadAction<SortOption>) {
      state.sortOption = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchFlights.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.hasInitialResults = false;
      })
      .addCase(searchFlights.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(searchFlights.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const {
  setSortOption,
  setSearchStarted,
  setSearchProgress,
  addFlightTrips,
  setSearchCompleted,
  setError,
} = flightSlice.actions;

export default flightSlice.reducer;
