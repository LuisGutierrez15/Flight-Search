import { type FC } from "react";
import { DateRange, Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useDatePicker } from "../hooks/useDatePicker";
import { addDays } from "date-fns";

interface FlightDatePickerProps {
  roundTrip?: boolean;
  onDateChange: (range: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  }) => void;
  selectedDates?: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  } | null;
}

const FlightDatePicker: FC<FlightDatePickerProps> = ({
  roundTrip,
  onDateChange,
  selectedDates,
}) => {
  const { range, selectedDate, multiDateHandler, singleDateHandler } =
    useDatePicker({ onDateChange, selectedDates });
  return roundTrip ? (
    <DateRange
      className="dark:bg-gray-900 dark:text-white bg-white text-black rounded-lg shadow-md"
      ranges={range}
      onChange={multiDateHandler}
      minDate={addDays(new Date(), 1)}
      showDateDisplay={false}
    />
  ) : (
    <Calendar
      className="dark:bg-gray-900 dark:text-white bg-white text-black rounded-lg shadow-md"
      date={selectedDate}
      onChange={singleDateHandler}
      minDate={addDays(new Date(), 1)}
    />
  );
};
export default FlightDatePicker;
