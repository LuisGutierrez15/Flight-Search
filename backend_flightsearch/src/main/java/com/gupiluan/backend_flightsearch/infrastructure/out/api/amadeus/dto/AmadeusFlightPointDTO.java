package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

public record AmadeusFlightPointDTO(
        String iataCode,
        String terminal,
        String at) {
}