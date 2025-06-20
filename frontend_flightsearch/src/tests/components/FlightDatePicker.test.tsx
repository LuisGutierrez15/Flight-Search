import { render, fireEvent } from "@testing-library/react";
import FlightDatePicker from "../../components/FlightDatePicker";

vi.mock("react-date-range", () => {
  return {
    DateRange: (props: any) => (
      <div
        data-testid="date-range"
        onClick={() =>
          props.onChange({
            selection: {
              startDate: new Date("2025-01-01"),
              endDate: new Date("2025-01-10"),
              key: "selection",
            },
          })
        }
      >
        DateRange Mock
      </div>
    ),
    Calendar: (props: any) => (
      <div
        data-testid="calendar"
        onClick={() => props.onChange(new Date("2025-02-01"))}
      >
        Calendar Mock
      </div>
    ),
  };
});

describe("FlightDatePicker", () => {
  it("renders DateRange when roundTrip is true and calls onDateChange on date range change", () => {
    const onDateChange = vi.fn();

    const { getByTestId } = render(
      <FlightDatePicker roundTrip={true} onDateChange={onDateChange} />
    );

    const dateRange = getByTestId("date-range");
    expect(dateRange).toBeDefined();

    fireEvent.click(dateRange);

    expect(onDateChange).toHaveBeenCalledWith({
      departureDate: new Date("2025-01-01"),
      returnDate: new Date("2025-01-10"),
    });
  });

  it("renders Calendar when roundTrip is false and calls onDateChange on date change", () => {
    const onDateChange = vi.fn();

    const { getByTestId } = render(
      <FlightDatePicker roundTrip={false} onDateChange={onDateChange} />
    );

    const calendar = getByTestId("calendar");
    expect(calendar).toBeDefined();

    fireEvent.click(calendar);

    expect(onDateChange).toHaveBeenCalledWith({
      departureDate: new Date("2025-02-01"),
      returnDate: undefined,
    });
  });

  it("passes selectedDates prop correctly to useDatePicker", () => {
    const onDateChange = vi.fn();

    const selectedDates = {
      departureDate: new Date("2025-03-01"),
      returnDate: new Date("2025-03-10"),
    };

    const { getByTestId } = render(
      <FlightDatePicker
        roundTrip={true}
        onDateChange={onDateChange}
        selectedDates={selectedDates}
      />
    );

    const dateRange = getByTestId("date-range");
    expect(dateRange).toBeDefined();

    fireEvent.click(dateRange);

    expect(onDateChange).toHaveBeenCalledWith({
      departureDate: new Date("2025-01-01"),
      returnDate: new Date("2025-01-10"),
    });
  });
});
