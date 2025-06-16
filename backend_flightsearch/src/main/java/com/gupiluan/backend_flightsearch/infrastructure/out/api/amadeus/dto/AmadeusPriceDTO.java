package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.math.BigDecimal;
import java.util.List;

public record AmadeusPriceDTO(String currency, BigDecimal total, BigDecimal base, List<AmadeusFeeDTO> fees,
                BigDecimal grandTotal) {
}