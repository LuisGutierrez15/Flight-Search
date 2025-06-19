import { configureStore } from "@reduxjs/toolkit";
import flightSearchCriteriaReducer from "../store/slices/flightSearchCriteriaSlice";
import flightSearchResultsReducer from "../store/slices/flightSearchResultsSlice";
import flightOfferReducer from "../store/slices/flightOfferSlice";

export const store = configureStore({
  reducer: {
    flightSearchCriteria: flightSearchCriteriaReducer,
    flightSearchResults: flightSearchResultsReducer,
    flightOffer: flightOfferReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
