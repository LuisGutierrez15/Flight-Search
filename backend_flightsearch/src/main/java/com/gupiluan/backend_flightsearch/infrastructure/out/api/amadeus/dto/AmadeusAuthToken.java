package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto;

import java.time.Instant;

/**
 * Represents an authentication token with its details.
 *
 * @param access_token the access token string
 * @param token_type   the type of the token (e.g., "Bearer")
 * @param expires_in   the number of seconds until the token expires
 */
public record AmadeusAuthToken(String access_token, String token_type, int expires_in) {

    public AmadeusAuthToken {
        if (access_token == null || access_token.isBlank()) {
            throw new IllegalArgumentException("Access token cannot be null or blank");
        }
        if (token_type == null || token_type.isBlank()) {
            throw new IllegalArgumentException("Token type cannot be null or blank");
        }
        if (expires_in <= 0) {
            throw new IllegalArgumentException("Expires in must be greater than zero");
        }
        expires_in = Math.toIntExact(Instant.now().plusSeconds(expires_in - 60).getEpochSecond());
    }

    public String token() {
        return access_token;
    }

    public String type() {
        return token_type;
    }

    public Instant expires() {
        return Instant.ofEpochSecond(expires_in);
    }

}
