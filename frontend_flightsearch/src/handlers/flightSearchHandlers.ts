import { AxiosError } from "axios";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { NavigateOptions, To } from "react-router-dom";
import { fetchData } from "../api/FlightSearchService";
import type { FlightSearchCriteria } from "../types/FlightSearchCriteria";
import type { UnknownAction } from "@reduxjs/toolkit";
import type { FlightOffer } from "../types/FlightOffer";

const handleSearch = async (
  setIsFetching: (value: SetStateAction<boolean>) => void,
  setError: (value: SetStateAction<string>) => void,
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>,
  dispatch: Dispatch<UnknownAction>,
  setFlightSearchResults: (value: FlightOffer[]) => UnknownAction,
  searchCriteria: FlightSearchCriteria
) => {
  setIsFetching(true);
  setError("");
  try {
    const response = await fetchData(searchCriteria);
    dispatch(setFlightSearchResults(response.offers));
    navigate("/results");
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.status === 500) {
      setError("Internal server error, please try again later");
    }
  } finally {
    setIsFetching(false);
  }
};
const handleOnDateChange = (
  range: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  },
  dispatch: Dispatch<UnknownAction>,
  setTripDates: (value: {
    departureDate: undefined | string;
    returnDate: undefined | string;
  }) => UnknownAction
) =>
  dispatch(
    setTripDates({
      departureDate: range.departureDate?.toISOString(),
      returnDate: range.returnDate?.toISOString(),
    })
  );
const handleOnAdultsChange = (
  e: ChangeEvent<HTMLInputElement>,
  setAdults_: (value: SetStateAction<number>) => void
) => {
  const n = parseInt(e.target.value);
  if (isNaN(n)) {
    setAdults_(0);
  }
  if (n > 9 || n < 0) return;
  setAdults_(n);
};

const handleOnCurrencyChange = (
  e: ChangeEvent<HTMLSelectElement>,
  dispatch: Dispatch<UnknownAction>,
  setCurrency: (value: string) => UnknownAction
) => dispatch(setCurrency(e.target.value));
const handleOnNonStopChange = (
  e: ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<UnknownAction>,
  setNonStop: (value: boolean) => UnknownAction
) => dispatch(setNonStop(e.target.checked));

const handleAirportSearch = (
  v: string | undefined,
  dispatch: Dispatch<UnknownAction>,
  setFunction: (value: string | undefined) => UnknownAction
) => dispatch(setFunction(v));

const handleToggleRoundTrip = (
  v: boolean,
  setIsRoundTrip: (value: SetStateAction<boolean>) => void
) => setIsRoundTrip(v);
export {
  handleSearch,
  handleOnDateChange,
  handleOnAdultsChange,
  handleOnCurrencyChange,
  handleOnNonStopChange,
  handleAirportSearch,
  handleToggleRoundTrip,
};
