package com.gupiluan.backend_flightsearch.domain.model;

import java.time.LocalDate;
import java.util.Optional;

public record FlightSearchCriteria(
                String origin,
                String destination,
                LocalDate departureDate,
                LocalDate returnDate,
                int adults,
                String currency,
                boolean nonStop) {

        public FlightSearchCriteria {
                if (origin == null || origin.isBlank()) {
                        throw new IllegalArgumentException("Origin code cannot be null or blank");
                }
                if (origin.equals(destination)) {
                        throw new IllegalArgumentException("Origin and destination cannot be the same");
                }
                if (destination == null || destination.isBlank()) {
                        throw new IllegalArgumentException("Destination code cannot be null or blank");
                }
                if (departureDate == null || departureDate.isBefore(LocalDate.now())) {
                        throw new IllegalArgumentException("Departure date invalid");
                }
                if (returnDate != null && returnDate.isBefore(departureDate)) {
                        throw new IllegalArgumentException("Return date cannot be before departure date");
                }
                if (adults <= 0 || adults >= 10) {
                        throw new IllegalArgumentException(
                                        "Number of adults must be greater than zero and lower than 10");
                }
                if (currency == null || currency.length() != 3) {
                        throw new IllegalArgumentException("Currency invalid: ");
                }
        }

        public Optional<LocalDate> getReturnDate() {
                return returnDate == null ? Optional.empty() : Optional.of(returnDate);
        }

}
