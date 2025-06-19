import type { ChangeEvent, SetStateAction } from "react";
import type { Airport } from "../types/Airport";

const handleChange = (
  e: ChangeEvent<HTMLInputElement>,
  setIsLoading: (value: SetStateAction<boolean>) => void,
  setHasSearched: (value: SetStateAction<boolean>) => void,
  debounceFetch: (query: string) => Promise<void> | undefined,
  setSearchQuery: (value: SetStateAction<string>) => void
) => {
  const query = e.target.value;
  setIsLoading(query.length > 0);
  setHasSearched(true);
  debounceFetch(query);
  setSearchQuery(query);
};

const handleClearTextField = (
  e: ChangeEvent<HTMLInputElement>,
  setAirport: (value: React.SetStateAction<Airport | undefined>) => void,
  onChange: (value: string | undefined) => void,
  setIsLoading: (value: React.SetStateAction<boolean>) => void,
  setSearchQuery: (value: React.SetStateAction<string>) => void,
  setHasSearched: (value: React.SetStateAction<boolean>) => void
) => {
  e.target.value = "";
  setAirport(undefined);
  setIsLoading(false);
  onChange(undefined);
  setSearchQuery("");
  setHasSearched(false);
};
const handleSelection = (
  option: Airport,
  setAirport: (value: React.SetStateAction<Airport | undefined>) => void,
  onChange: (value: string | undefined) => void,
  setAirportsFetched: (value: React.SetStateAction<Airport[]>) => void,
  setSearchQuery: (value: React.SetStateAction<string>) => void
) => {
  setAirport(option);
  setAirportsFetched([]);
  onChange(`${option.iataCode}: ${option.city}, ${option.country}`);
  setSearchQuery(`${option.iataCode}: ${option.city}, ${option.country}`);
};

export { handleChange, handleClearTextField, handleSelection };
