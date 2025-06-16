package com.gupiluan.backend_flightsearch.infrastructure.in.web.dto;

import java.util.List;

public record WebFareDetails(String cabin, String fareClass, List<WebAmenity> amenities) {

}
