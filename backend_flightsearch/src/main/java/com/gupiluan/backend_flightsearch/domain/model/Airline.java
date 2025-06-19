package com.gupiluan.backend_flightsearch.domain.model;

/**
 * Represents an airline with its details.
 *
 * @param name the name of the airline
 * @param code the code of the airline
 */
public record Airline(
                String code,
                String name) {
}
