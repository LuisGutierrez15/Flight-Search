package com.gupiluan.backend_flightsearch.domain.model;

import java.time.Duration;
import java.util.List;

/**
 * @param id                id of each segment
 * @param departureTime     departure time of each segment
 * @param departureAirport  departure airport of each segment
 * @param departureTerminal departure terminal of each segment
 * @param arrivalTime       arrival time of each segment
 * @param arrivalAirport    arrival airport of each segment
 * @param arrivalTerminal   arrival terminal of each segment
 * @param marketingAirline  marketing airline of each segment
 * @param operatingAirline  operating airline of each segment can be null
 * @param flightNumber      flight number of each segment
 * @param aircraftType      aircraft type of each segment
 * @param flightDuration    flight duration of each segment
 * @param stops             number of stops of each segment
 */
public record FlightSegment(
                String id,
                String departureTime,
                Airport departureAirport,
                String departureTerminal,
                String arrivalTime,
                Airport arrivalAirport,
                String arrivalTerminal,
                Airline marketingAirline,
                Airline operatingAirline,
                String flightNumber,
                String aircraftType,
                Duration flightDuration,
                List<Stop> stops) {

}
