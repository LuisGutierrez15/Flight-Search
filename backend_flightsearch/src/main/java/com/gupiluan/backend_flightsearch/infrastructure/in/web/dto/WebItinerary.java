package com.gupiluan.backend_flightsearch.infrastructure.in.web.dto;

import java.time.Duration;
import java.util.List;

public record WebItinerary(
                Duration duration,
                WebDeparture departure,
                WebArrival arrival,
                WebAirline mainAirline,
                WebAirline operatingAirline,
                List<WebSegment> segments) {

}
