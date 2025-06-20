package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;

public record AmadeusItineraryDTO(
        String duration,
        List<AmadeusSegmentDTO> segments) {
}