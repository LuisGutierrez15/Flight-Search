package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

public record AmadeusAmenityDTO(String description, boolean isChargeable,
        AmadeusAmenityProviderDTO amenityProvider) {

}
