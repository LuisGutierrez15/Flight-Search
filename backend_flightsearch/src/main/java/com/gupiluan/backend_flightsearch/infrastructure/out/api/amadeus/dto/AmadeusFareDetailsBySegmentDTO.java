package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AmadeusFareDetailsBySegmentDTO(
        String segmentId,
        String cabin,
        String fareBasis,
        String brandedFare,
        String brandedFareLabel,
        @JsonProperty("class") String clazz,
        AmadeusIncludedCheckedBagsDTO includedCheckedBags,
        AmadeusIncludedCabinBagsDTO includedCabinBags,
        List<AmadeusAmenityDTO> amenities) {
}
