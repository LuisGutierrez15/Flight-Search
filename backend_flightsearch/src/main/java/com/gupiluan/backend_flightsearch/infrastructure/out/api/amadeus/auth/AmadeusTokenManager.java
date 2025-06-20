package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.auth;

import java.time.Instant;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusAuthToken;

public class AmadeusTokenManager {

    private static AmadeusTokenManager instance;
    private AmadeusAuthToken accessToken;
    private final String apiKey;
    private final String apiSecret;

    private AmadeusTokenManager(String apiKey,
            String apiSecret) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;

    }

    public static AmadeusTokenManager getTokenManager(String key, String secret) {
        if (instance == null) {
            instance = new AmadeusTokenManager(key, secret);
        }
        return instance;
    };

    public String getAccessToken(WebClient wb) {
        if (accessToken == null || Instant.now().isAfter(accessToken.expires())) {
            accessToken = refreshAccessToken(wb);
        }
        return accessToken.token();
    }

    public String getTokenType() {
        return accessToken.type();
    }

    private AmadeusAuthToken refreshAccessToken(WebClient webClient) {
        return webClient.post()
                .uri("/v1/security/oauth2/token").contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body(BodyInserters
                        .fromFormData("grant_type", "client_credentials").with("client_id", apiKey)
                        .with("client_secret", apiSecret))
                .retrieve()
                .bodyToMono(AmadeusAuthToken.class)
                .block();
    }
}
