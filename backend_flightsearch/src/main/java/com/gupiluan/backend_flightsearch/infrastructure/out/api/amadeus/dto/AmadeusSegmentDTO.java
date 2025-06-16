package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;

public record AmadeusSegmentDTO(
        AmadeusFlightPointDTO departure,
        AmadeusFlightPointDTO arrival,
        String carrierCode,
        String number,
        AmadeusAircraftDTO aircraft,
        AmadeusOperatingDTO operating,
        String duration,
        String id,
        int numberOfStops,
        List<AmadeusFlightStopDTO> stops,
        boolean blacklistedInEU) {
}