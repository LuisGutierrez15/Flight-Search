package com.gupiluan.backend_flightsearch.domain.model;

/**
 * @param name         the description of the amenity or name
 * @param isChargeable defines if the amenity is chargeable or not
 * 
 */
public record Amenity(String name, boolean isChargeable) {
}
