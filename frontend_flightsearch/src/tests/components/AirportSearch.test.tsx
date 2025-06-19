import { render, screen, fireEvent } from "@testing-library/react";
import type { Airport } from "../../types/Airport";
import AirportSearch from "../../components/AirportSearch";

vi.mock("../../components/Input", () => ({
  default: ({ label, ...props }: any) => (
    <div>
      <label>{label}</label>
      <input role="airport-input" {...props} />
    </div>
  ),
}));

vi.mock("../../components/DropDown", () => ({
  default: ({ data, selectOption, renderOption }: any) => (
    <div role="dropdown">
      {data.map((item: any, i: number) => (
        <div key={i} role="dropdown-option" onClick={() => selectOption(item)}>
          {renderOption(item)}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../../hooks/useFetchAirport", async () => {
  const mockedAirports: Airport[] = [
    {
      iataCode: "LAX",
      city: "Los Angeles",
      name: "Los Angeles International Airport",
      country: "United States",
    },
    {
      iataCode: "JFK",
      city: "New York",
      name: "John F. Kennedy International Airport",
      country: "United States",
    },
  ];

  return {
    useFetchAirport: vi.fn(() => ({
      isOpen: true,
      searchQuery: "LA",
      changeHandler: vi.fn(),
      clearTextFieldHandler: vi.fn(),
      selectionHandler: vi.fn(),
      airportsFetched: mockedAirports,
      isLoading: false,
    })),
  };
});

describe("AirportSearch component", () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("renders input with label", () => {
    render(
      <AirportSearch
        label="Departure Airport"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(screen.getByText("Departure Airport")).toBeInTheDocument();
  });

  it("shows dropdown when isOpen is true", () => {
    render(
      <AirportSearch
        label="Departure Airport"
        value=""
        onChange={mockOnChange}
      />
    );
    expect(screen.getByRole("dropdown")).toBeInTheDocument();
    expect(screen.getAllByRole("dropdown-option")).toHaveLength(2);
  });

  it("calls selectionHandler on option click", async () => {
    const { useFetchAirport } = await import("../../hooks/useFetchAirport");
    const mockSelectionHandler = vi.fn();
    (useFetchAirport as any).mockReturnValue({
      isOpen: true,
      searchQuery: "",
      changeHandler: vi.fn(),
      clearTextFieldHandler: vi.fn(),
      selectionHandler: mockSelectionHandler,
      airportsFetched: [
        {
          iataCode: "LAX",
          city: "Los Angeles",
          name: "Los Angeles International Airport",
        },
      ],
      isLoading: false,
    });

    render(
      <AirportSearch
        label="Departure Airport"
        value=""
        onChange={mockOnChange}
      />
    );
    const option = screen.getByRole("dropdown-option");
    fireEvent.click(option);
    expect(mockSelectionHandler).toHaveBeenCalledTimes(1);
  });
});
