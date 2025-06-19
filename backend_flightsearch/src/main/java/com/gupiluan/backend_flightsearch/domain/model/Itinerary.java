package com.gupiluan.backend_flightsearch.domain.model;

import java.time.Duration;
import java.util.List;

/**
 * @param duration duration of the itinerary
 * @param segment  list of segments
 */
public record Itinerary(
        Duration duration,
        List<FlightSegment> segments) {

}
