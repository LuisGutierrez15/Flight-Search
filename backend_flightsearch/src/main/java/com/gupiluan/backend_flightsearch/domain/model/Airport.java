package com.gupiluan.backend_flightsearch.domain.model;

/**
 * Represents an airport with its details.
 *
 * @param name     the name of the airport
 * @param iataCode the IATA code of the airport
 * @param city     the city where the airport is located
 * @param country  the country where the airport is located
 */
public record Airport(String name, String iataCode, String city, String country) {

    public Airport {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Airport name cannot be null or blank");
        }
        if (iataCode == null || iataCode.isBlank() || iataCode.length() != 3) {
            throw new IllegalArgumentException("Airport code must be a valid 3-letter IATA code");
        }

    }

}
