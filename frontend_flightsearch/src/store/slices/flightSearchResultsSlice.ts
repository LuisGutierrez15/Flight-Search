import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FlightOffer } from "../../types/FlightOffer";

interface Results {
  flightOffers: FlightOffer[];
  error: string | null;
  visited: string[];
}

const initialState: Results = {
  flightOffers: [],
  visited: [],
  error: null,
};

export const flightSearchResultsSlice = createSlice({
  name: "flightSearchResults",
  initialState,
  reducers: {
    setFlightSearchResults(state, action: PayloadAction<FlightOffer[]>) {
      state.flightOffers = action.payload;
    },
    resetResults(_) {
      return initialState;
    },
    addVisited(state, action: PayloadAction<string>) {
      state.visited.push(action.payload);
    },
  },
});

export const { setFlightSearchResults, resetResults, addVisited } =
  flightSearchResultsSlice.actions;

export default flightSearchResultsSlice.reducer;
