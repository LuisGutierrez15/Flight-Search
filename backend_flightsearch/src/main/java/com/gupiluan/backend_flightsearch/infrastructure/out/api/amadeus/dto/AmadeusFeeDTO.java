package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.math.BigDecimal;

public record AmadeusFeeDTO(BigDecimal amount, String type) {
}