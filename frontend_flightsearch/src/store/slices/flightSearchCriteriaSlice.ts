import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FlightSearchCriteria } from "../../types/FlightSearchCriteria";

const initialState: FlightSearchCriteria = {
  origin: undefined,
  destination: undefined,
  departureDate: undefined,
  returnDate: undefined,
  adults: undefined,
  currency: undefined,
  nonStop: undefined,
  sortByPrice: undefined,
  sortByDuration: undefined,
};

export const flightSearchCriteriaSlice = createSlice({
  name: "flightSearchCriteria",
  initialState,
  reducers: {
    setOrigin(state, action: PayloadAction<string | undefined>) {
      state.origin = action.payload;
    },
    setDestination(state, action: PayloadAction<string | undefined>) {
      state.destination = action.payload;
    },
    setDepartureDate(state, action: PayloadAction<string | undefined>) {
      state.departureDate = action.payload;
    },
    setReturnDate(state, action: PayloadAction<string | undefined>) {
      state.returnDate = action.payload;
    },
    setAdults(state, action: PayloadAction<number | undefined>) {
      state.adults = action.payload;
    },
    setCurrency(state, action: PayloadAction<string | undefined>) {
      state.currency = action.payload;
    },
    setNonStop(state, action: PayloadAction<boolean | undefined>) {
      state.nonStop = action.payload;
    },
    setTripDates(
      state,
      action: PayloadAction<{
        departureDate: undefined | string;
        returnDate: undefined | string;
      }>
    ) {
      state.departureDate = action.payload.departureDate;
      state.returnDate = action.payload.returnDate;
    },
    setSortByPrice(state, action: PayloadAction<"asc" | "desc" | undefined>) {
      state.sortByPrice = action.payload;
    },
    setSortByDuration(
      state,
      action: PayloadAction<"asc" | "desc" | undefined>
    ) {
      state.sortByDuration = action.payload;
    },
    resetAll(_) {
      return initialState;
    },
  },
});

export const {
  setOrigin,
  setDestination,
  setDepartureDate,
  setReturnDate,
  setAdults,
  setCurrency,
  setNonStop,
  setTripDates,
  setSortByPrice,
  setSortByDuration,
  resetAll,
} = flightSearchCriteriaSlice.actions;

export default flightSearchCriteriaSlice.reducer;
