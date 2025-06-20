package com.gupiluan.backend_flightsearch.common;

public record ApiResponse(
        int status,
        String message,
        Object data) {
}
