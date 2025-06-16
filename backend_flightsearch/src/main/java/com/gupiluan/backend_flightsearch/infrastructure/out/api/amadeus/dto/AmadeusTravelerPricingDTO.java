package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;

public record AmadeusTravelerPricingDTO(
                String travelerId,
                String fareOption,
                String travelerType,
                AmadeusPriceDTO price,
                List<AmadeusFareDetailsBySegmentDTO> fareDetailsBySegment) {
}