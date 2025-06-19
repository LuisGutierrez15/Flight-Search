import { useMemo, useState, type ChangeEvent } from "react";
import type { Airport } from "../types/Airport";
import { getAirports } from "../api/FlightSearchService";
import debounce from "lodash.debounce";
import {
  handleChange,
  handleClearTextField,
  handleSelection,
} from "../handlers/airportSearchHandlers";

interface useFetchProps {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}
export const useFetchAirport = ({ value, onChange }: useFetchProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [airportsFetched, setAirportsFetched] = useState<Airport[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(value ?? "");
  const [airport, setAirport] = useState<Airport | undefined>(undefined);
  const [hasSearched, setHasSearched] = useState(false);
  const isOpen = useMemo(
    () =>
      hasSearched &&
      value === undefined &&
      !airport &&
      (isLoading || airportsFetched.length > 0 || searchQuery.length > 0),
    [hasSearched, value, airport, isLoading, airportsFetched]
  );

  const fetchResults = async (query: string) => {
    if (!query) return;
    try {
      const response = await getAirports(query);
      setAirportsFetched(response.airports);
    } catch (error) {
      setAirportsFetched([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceFetch = useMemo(() => debounce(fetchResults, 500), []);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) =>
    handleChange(
      e,
      setIsLoading,
      setHasSearched,
      debounceFetch,
      setSearchQuery
    );

  const clearTextFieldHandler = (e: ChangeEvent<HTMLInputElement>) =>
    handleClearTextField(
      e,
      setAirport,
      onChange,
      setIsLoading,
      setSearchQuery,
      setHasSearched
    );

  const selectionHandler = (option: Airport) =>
    handleSelection(
      option,
      setAirport,
      onChange,
      setAirportsFetched,
      setSearchQuery
    );

  return {
    isOpen,
    changeHandler,
    clearTextFieldHandler,
    selectionHandler,
    airportsFetched,
    isLoading,
    searchQuery,
  };
};
