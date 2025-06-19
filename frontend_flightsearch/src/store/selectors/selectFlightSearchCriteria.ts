import type { FlightSearchCriteria } from "../../types/FlightSearchCriteria";
import type { RootState } from "../store";

export const selectFlightSearchCriteria = (
  state: RootState
): FlightSearchCriteria => state.flightSearchCriteria;
