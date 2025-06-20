package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;
import java.util.Map;

public record AmadeusAirportSearchResponse(List<AmadeusAirportDTO> data,
        MetaDTO meta) {
    public record MetaDTO(int count, Map<String, Object> links) {

    }

}
