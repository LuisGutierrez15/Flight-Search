import type { FlightOffer } from "../../types/FlightOffer";
import type { RootState } from "../store";

export const selectFlightOffer = (state: RootState): FlightOffer =>
  state.flightOffer;
