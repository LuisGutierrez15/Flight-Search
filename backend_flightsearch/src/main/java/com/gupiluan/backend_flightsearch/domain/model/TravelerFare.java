package com.gupiluan.backend_flightsearch.domain.model;

import java.util.List;

/**
 * @param travelerId   id for each traveler
 * @param tarvelerType type of traveler
 * @param fareOption   fare option for each traveler
 * @param fare         Amount fare amount for each traveler
 * @param fareDetails  fare details for each traveler
 */
public record TravelerFare(
        String travelerId,
        String tarvelerType,
        String fareOption,
        Price fare,
        List<FareDetails> fareDetails) {

}
