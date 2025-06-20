import { useEffect, useState, type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFlightSearchCriteria } from "../store/selectors/selectFlightSearchCriteria";
import { useNavigate } from "react-router-dom";
import {
  setAdults,
  setCurrency,
  setDestination,
  setNonStop,
  setOrigin,
  setTripDates,
} from "../store/slices/flightSearchCriteriaSlice";
import {
  handleAirportSearch,
  handleOnAdultsChange,
  handleOnCurrencyChange,
  handleOnDateChange,
  handleOnNonStopChange,
  handleSearch,
  handleToggleRoundTrip,
} from "../handlers/flightSearchHandlers";
import { setFlightSearchResults } from "../store/slices/flightSearchResultsSlice";

export const useFetchFlightOffers = () => {
  const dispatch = useDispatch();
  const searchCriteria = useSelector(selectFlightSearchCriteria);
  const navigate = useNavigate();
  const { adults, departureDate, returnDate, currency, origin, destination } =
    searchCriteria;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [adults_, setAdults_] = useState<number>(adults ?? 0);
  const [error, setError] = useState<string>("");
  const [isRoundTrip, setIsRoundTrip] = useState<boolean>(false);

  useEffect(() => {
    dispatch(
      setTripDates({
        departureDate: undefined,
        returnDate: undefined,
      })
    );
  }, [isRoundTrip, dispatch]);

  const selectedDates = {
    departureDate:
      departureDate instanceof Date
        ? departureDate
        : departureDate
        ? new Date(departureDate)
        : undefined,
    returnDate:
      returnDate instanceof Date
        ? returnDate
        : returnDate
        ? new Date(returnDate)
        : undefined,
  };

  useEffect(() => {
    dispatch(setAdults(adults_));
  }, [adults_, dispatch]);

  const canMoveFoward = {
    1: destination! !== origin!,
    2: true,
    3: isRoundTrip ? returnDate !== undefined : departureDate !== undefined,
    4: adults_ > 0 && currency !== "" && currency !== undefined,
  };

  const searchHandler = async () =>
    handleSearch(
      setIsFetching,
      setError,
      navigate,
      dispatch,
      setFlightSearchResults,
      searchCriteria
    );
  const onDateChangeHandler = (range: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  }) => handleOnDateChange(range, dispatch, setTripDates);
  const onAdultsChangeHanlder = (e: ChangeEvent<HTMLInputElement>) =>
    handleOnAdultsChange(e, setAdults_);

  const onCurrencyChangeHandler = (e: ChangeEvent<HTMLSelectElement>) =>
    handleOnCurrencyChange(e, dispatch, setCurrency);
  const onNonStopChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    handleOnNonStopChange(e, dispatch, setNonStop);

  const originAirportHandler = (v: string | undefined) =>
    handleAirportSearch(v, dispatch, setOrigin);
  const destinationAirportHandler = (v: string | undefined) =>
    handleAirportSearch(v, dispatch, setDestination);

  const isRoundTripFlight = () => handleToggleRoundTrip(true, setIsRoundTrip);
  const isOneWayFlight = () => handleToggleRoundTrip(false, setIsRoundTrip);

  return {
    isFetching,
    error,
    isRoundTrip,
    setIsRoundTrip,
    selectedDates,
    canMoveFoward,
    searchHandler,
    onDateChangeHandler,
    onAdultsChangeHanlder,
    onCurrencyChangeHandler,
    onNonStopChangeHandler,
    adults_,
    origin,
    destination,
    currency,
    originAirportHandler,
    destinationAirportHandler,
    isOneWayFlight,
    isRoundTripFlight,
  };
};
