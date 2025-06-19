package com.gupiluan.backend_flightsearch.infrastructure.in.web.dto;

import java.time.Duration;
import java.util.List;

public record WebSegment(
                String id,
                WebDeparture departure,
                Duration duration,
                WebArrival arrival,
                WebAirline mainAirline,
                WebAirline operatingAirline,
                String flightNumber,
                String aircraft,
                List<WebStop> stops,
                WebFareDetails details) {

}
