package com.gupiluan.backend_flightsearch.domain.model;

import java.util.List;

public record FareDetails(
        String segmentId,
        String cabin,
        String fareClass,
        String fareBasis,
        String brandedFare,
        List<Amenity> amenities) {
}
