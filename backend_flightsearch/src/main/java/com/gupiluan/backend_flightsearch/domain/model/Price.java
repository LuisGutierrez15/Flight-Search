package com.gupiluan.backend_flightsearch.domain.model;

import java.math.BigDecimal;

/**
 * @param currency   currency code
 * @param total      Amount total amount of the flight
 * @param base       Amount Base amount of the flight
 * @param grandTotal Grand total amount of the flight
 * @param fees       Fees amount of the flight
 */
public record Price(
                String currency,
                BigDecimal total,
                BigDecimal base,
                BigDecimal grandTotal,
                BigDecimal fees) {

}
