package com.gupiluan.backend_flightsearch.domain.model;

import java.util.List;

public record TravelerFare(
                String travelerId,
                String tarvelerType,
                String fareOption,
                Price fare,
                List<FareDetails> fareDetails) {

}
