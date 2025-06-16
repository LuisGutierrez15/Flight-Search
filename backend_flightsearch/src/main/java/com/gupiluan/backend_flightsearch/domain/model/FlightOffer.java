package com.gupiluan.backend_flightsearch.domain.model;

import java.util.List;

/**
 * Represents the result of a flight search, containing details about the
 * flight,
 * including departure and arrival times, airports, airlines, flight duration,
 * stopover airports, and pricing information.
 *
 * @param id             the unique identifier for the flight offer
 * @param availableSeats the number of available seats for booking
 * @param itineraries    a list of itineraries for the flight, each
 *                       containing details about the flight segments (if the
 *                       trip is round-trip,
 *                       there will be two itineraries)
 * @param mainAirline    the main airline operating the flight
 * @param price          the total price for the flight offer
 * @param travelerFares  a list of fares for each traveler, containing
 *                       pricing details and fare conditions
 * 
 */
public record FlightOffer(
                String id,
                int availableSeats,
                List<Itinerary> itineraries,
                Airline mainAirline,
                Price price,
                List<TravelerFare> travelerFares) {

}
