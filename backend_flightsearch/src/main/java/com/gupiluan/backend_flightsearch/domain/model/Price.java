package com.gupiluan.backend_flightsearch.domain.model;

import java.math.BigDecimal;

public record Price(
        String currency,
        BigDecimal total,
        BigDecimal base,
        BigDecimal grandTotal,
        BigDecimal fees) {

}
