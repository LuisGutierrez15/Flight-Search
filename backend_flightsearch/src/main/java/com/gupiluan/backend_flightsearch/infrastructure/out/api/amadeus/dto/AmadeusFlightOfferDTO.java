package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.util.List;

public record AmadeusFlightOfferDTO(
                String type,
                String id,
                String source,
                boolean instantTicketingRequired,
                boolean nonHomogeneous,
                boolean oneWay,
                String lastTicketingDate,
                int numberOfBookableSeats,
                List<AmadeusItineraryDTO> itineraries,
                AmadeusPriceDTO price,
                List<String> validatingAirlineCodes,
                List<AmadeusTravelerPricingDTO> travelerPricings) {
}
