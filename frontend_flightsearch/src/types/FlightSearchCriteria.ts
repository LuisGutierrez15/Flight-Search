export type FlightSearchCriteria = {
  origin: string | undefined;
  destination: string | undefined;
  departureDate: Date | undefined | string;
  returnDate: Date | undefined | string;
  adults: number | undefined;
  currency: string | undefined;
  nonStop: boolean | undefined;
  sortByPrice: "asc" | "desc" | undefined;
  sortByDuration: "asc" | "desc" | undefined;
};
