package com.gupiluan.backend_flightsearch.domain.model;

import java.time.Duration;
import java.util.List;

public record Itinerary(
                Duration duration,
                List<FlightSegment> segments) {

}
