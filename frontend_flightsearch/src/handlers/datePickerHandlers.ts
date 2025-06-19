import type { SetStateAction } from "react";
import type { Range, RangeKeyDict } from "react-date-range";

const handleRangeChange = (
  rangesByKey: RangeKeyDict,
  setRange: (value: SetStateAction<Range[]>) => void,
  onDateChange: (range: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  }) => void
) => {
  setRange([rangesByKey.selection]);
  if (onDateChange) {
    onDateChange({
      departureDate: rangesByKey.selection.startDate || undefined,
      returnDate: rangesByKey.selection.endDate || undefined,
    });
  }
};
const handleSingleDateChange = (
  date: Date,
  setSelectedDate: (value: SetStateAction<Date | undefined>) => void,
  onDateChange: (range: {
    departureDate: Date | undefined;
    returnDate: Date | undefined;
  }) => void
) => {
  setSelectedDate(date);
  if (onDateChange) {
    onDateChange({
      departureDate: date,
      returnDate: undefined,
    });
  }
};

export { handleRangeChange, handleSingleDateChange };
