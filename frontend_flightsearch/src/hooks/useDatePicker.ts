import { useState } from "react";
import type { Range, RangeKeyDict } from "react-date-range";
import {
  handleRangeChange,
  handleSingleDateChange,
} from "../handlers/datePickerHandlers";
interface UseDatePickerProps {
  onDateChange: (range: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  }) => void;
  selectedDates?: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  } | null;
}
export const useDatePicker = ({
  onDateChange,
  selectedDates,
}: UseDatePickerProps) => {
  const [range, setRange] = useState<Range[]>([
    {
      startDate: selectedDates?.departureDate,
      endDate: selectedDates?.returnDate,
      key: "selection",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const singleDateHandler = (date: Date) =>
    handleSingleDateChange(date, setSelectedDate, onDateChange);
  const multiDateHandler = (rangesByKey: RangeKeyDict) =>
    handleRangeChange(rangesByKey, setRange, onDateChange);

  return { range, selectedDate, singleDateHandler, multiDateHandler };
};
