import { type FC } from "react";
import Input from "./Input";
import { type Airport } from "../types/Airport";
import DropDown from "./DropDown";
import { useFetchAirport } from "../hooks/useFetchAirport";

interface AirportSearchProps {
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

const AirportSearch: FC<AirportSearchProps> = ({ label, value, onChange }) => {
  const {
    isOpen,
    selectionHandler,
    changeHandler,
    clearTextFieldHandler,
    airportsFetched,
    searchQuery,
    isLoading,
  } = useFetchAirport({ value, onChange });
  const renderAirportOption = (airport: Airport) => (
    <span>{`${airport.iataCode}: ${airport.city}, ${airport.name}`}</span>
  );

  return (
    <div className="relative max-w-dvw p-5">
      <Input
        label={label}
        value={searchQuery}
        type="text"
        placeholder="Airport code or City name"
        onChange={changeHandler}
        onFocus={clearTextFieldHandler}
      />
      {isOpen && (
        <DropDown
          data={airportsFetched}
          isLoading={isLoading}
          selectOption={selectionHandler}
          renderOption={renderAirportOption}
        />
      )}
    </div>
  );
};

export default AirportSearch;
