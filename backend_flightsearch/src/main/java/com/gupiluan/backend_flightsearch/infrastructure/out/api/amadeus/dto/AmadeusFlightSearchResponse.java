package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;
import java.util.Map;

public record AmadeusFlightSearchResponse(List<AmadeusFlightOfferDTO> data,
                MetaDTO meta, DictionariesDTO dictionaries) {
        public record MetaDTO(int count, Map<String, Object> links) {

        }

        public record DictionariesDTO(
                        Map<String, AmadeusLocationDTO> locations,
                        Map<String, String> aircraft,
                        Map<String, String> currencies,
                        Map<String, String> carriers) {
        }

}
