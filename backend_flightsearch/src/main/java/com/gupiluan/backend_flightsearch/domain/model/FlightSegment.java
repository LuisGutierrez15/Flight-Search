package com.gupiluan.backend_flightsearch.domain.model;

import java.time.Duration;
import java.util.List;

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
