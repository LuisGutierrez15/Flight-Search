package com.gupiluan.backend_flightsearch.infrastructure.in.web.dto;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

public record WebFlightOffer(
        String offerId,
        Duration duration,
        BigDecimal basePrice,
        BigDecimal totalPrice,
        BigDecimal basePricePerTraveler,
        BigDecimal totalPricePerTraveler,
        BigDecimal fees,
        WebAirline mainAirline,
        String currency,
        List<WebItinerary> itineraries) {

}
