package com.gupiluan.backend_flightsearch.domain.model;

import java.util.List;

/**
 * @param segmentId   id of the segment
 * @param cabin       Class cabin class of the segment
 * @param fareClass   fare class of the segment
 * @param fareBasis   fare basis of the segment
 * @param brandedFare branded fare of the segment
 * @param amenities   list of amenities of the segment
 */
public record FareDetails(
                String segmentId,
                String cabin,
                String fareClass,
                String fareBasis,
                String brandedFare,
                List<Amenity> amenities) {
}
