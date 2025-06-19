import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FlightOffer } from "../../types/FlightOffer";

const initialState: FlightOffer = {
  offerId: "",
  duration: "",
  basePrice: 0,
  totalPrice: 0,
  basePricePerTraveler: 0,
  totalPricePerTraveler: 0,
  fees: 0,
  currency: "",
  mainAirline: {
    code: "",
    name: "",
  },
  itineraries: [],
};

export const flightOfferSlice = createSlice({
  name: "flightOffer",
  initialState,
  reducers: {
    setflightOffer(_, action: PayloadAction<FlightOffer>) {
      return action.payload;
    },
    resetOffer(_) {
      return initialState;
    },
  },
});

export const { setflightOffer, resetOffer } = flightOfferSlice.actions;

export default flightOfferSlice.reducer;
