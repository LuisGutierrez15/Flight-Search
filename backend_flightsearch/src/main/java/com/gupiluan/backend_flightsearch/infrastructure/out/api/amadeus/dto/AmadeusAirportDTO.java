package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

public record AmadeusAirportDTO(String name, String iataCode, AmadeusAddressDTO address) {
    public record AmadeusAddressDTO(String cityName, String countryName) {
    }

}
