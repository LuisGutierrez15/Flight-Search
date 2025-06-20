import type { Airport } from "./Airport";

export type FlightOffer = {
  offerId: string;
  duration: string;
  basePrice: number;
  totalPrice: number;
  basePricePerTraveler: number;
  totalPricePerTraveler: number;
  fees: number;
  currency: string;
  mainAirline: Airline;
  itineraries: Itinerary[];
};

type Itinerary = {
  duration: string;
  departure: Departure;
  arrival: Arrival;
  mainAirline: Airline;
  operatingAirline: Airline;
  segments: Segment[];
};

type Departure = {
  departureTime: Date;
  departureAirport: Airport;
};
type Arrival = {
  arrivalTime: Date;
  arrivalAirport: Airport;
};
type Airline = {
  code: string;
  name: string;
};
type Segment = {
  id: string;
  duration: string;
  departure: Departure;
  arrival: Arrival;
  mainAirline: Airline;
  operatingAirline: Airline;
  flightNumber: string;
  aircraft: string;
  stops: Stop[];
  details: FareDetails;
};

type Stop = { airport: Airport; stopDuration: string };

type FareDetails = {
  cabin: string;
  fareClass: string;
  amenities: Amenity[];
};
type Amenity = {
  name: string;
  isChargeable: boolean;
};
