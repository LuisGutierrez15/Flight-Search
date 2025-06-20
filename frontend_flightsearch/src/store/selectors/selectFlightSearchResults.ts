import type { RootState } from "../store";

export const selectFlightSearchResults = (state: RootState) =>
  state.flightSearchResults;
