package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Currency;
import java.util.HashMap;

import com.fasterxml.jackson.databind.JsonNode;
import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.CurrencyDomain;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSearchCriteria;
import com.gupiluan.backend_flightsearch.domain.port.out.FlightSearchClientPort;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusAirportDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusAirportDTO.AmadeusAddressDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.mapper.AmadeusMapper;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusAirportSearchResponse;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusFlightSearchResponse;

import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.auth.AmadeusTokenManager;

import reactor.core.publisher.Mono;

@Component
public class AmadeusApiClient implements FlightSearchClientPort {

    private final WebClient webClient;
    private AmadeusTokenManager authTokenManager;
    private Map<String, AmadeusAirportDTO> dictionaryAirportsCache = new HashMap<>();

    public AmadeusApiClient(WebClient.Builder webClientBuilder,
            @Value("${amadeusapi.key}") String apiKey,
            @Value("${amadeusapi.secret}") String apiSecret,
            @Value("${amadeusapi.base-url}") String baseUrl) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).exchangeStrategies(ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024))
                .build()).build();
        this.authTokenManager = AmadeusTokenManager.getTokenManager(apiKey, apiSecret);

    }

    @Override
    public List<CurrencyDomain> getCurrencies() {
        Set<Currency> currencies = Currency.getAvailableCurrencies();
        ArrayList<CurrencyDomain> result = new ArrayList<>();
        currencies.forEach(c -> {
            String code = c.getCurrencyCode();
            result.add(new CurrencyDomain(code, c.getDisplayName(Locale.forLanguageTag("en"))));
        });
        result.sort(Comparator.comparing(CurrencyDomain::code));
        return result;
    }

    @Override
    public List<FlightOffer> fetchFlights(FlightSearchCriteria flightSearchCriteria) {
        String accessToken = authTokenManager.getAccessToken(webClient);
        AmadeusFlightSearchResponse result = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v2/shopping/flight-offers")
                        .queryParam("originLocationCode", flightSearchCriteria.origin())
                        .queryParam("destinationLocationCode", flightSearchCriteria.destination())
                        .queryParam("departureDate", flightSearchCriteria.departureDate())
                        .queryParam("returnDate", flightSearchCriteria.returnDate())
                        .queryParam("adults", flightSearchCriteria.adults())
                        .queryParam("nonStop", flightSearchCriteria.nonStop())
                        .queryParam("currencyCode", flightSearchCriteria.currency())
                        .queryParam("max", "100") // 100 max for performance
                        .build())
                .header("Authorization", authTokenManager.getTokenType() + " " + accessToken)
                .retrieve()
                .onStatus(status -> status.equals(HttpStatus.TOO_MANY_REQUESTS),
                        r -> Mono.delay(Duration.ofSeconds(2))
                                .then(Mono.error(new RuntimeException("Retrying due to rate limit"))))
                .onStatus(status -> status.is4xxClientError() || status.is5xxServerError(),
                        clientResponse -> clientResponse.bodyToMono(JsonNode.class)
                                .flatMap(jsonNode -> {
                                    String errorMessage = jsonNode.path("errors").asText("Unknown error");
                                    return clientResponse.createException().flatMap(ex -> {
                                        throw new RuntimeException(errorMessage, ex);
                                    });
                                }))
                .bodyToMono(new ParameterizedTypeReference<AmadeusFlightSearchResponse>() {
                })
                .block();

        if (result == null || result.data() == null) {
            return List.of();
        }

        Map<String, String> dictionaryAircrafts = result.dictionaries().aircraft();
        Map<String, String> dictionaryCarriers = result.dictionaries().carriers();

        for (String key : result.dictionaries().locations().keySet()) {
            if (dictionaryAirportsCache.get(key) != null) {
                continue;
            }

            List<AmadeusAirportDTO> airportDTOs = getAirports(key);

            Optional<AmadeusAirportDTO> airport = airportDTOs.stream()
                    .filter(aP -> key.equals(aP.iataCode())).findFirst();

            if (airportDTOs.size() < 1 || !airport.isPresent()) {
                dictionaryAirportsCache.put(key, new AmadeusAirportDTO("Unknown Airport " + key, key,
                        new AmadeusAddressDTO("Unknown City", "Unknown Country")));
                continue;
            }

            dictionaryAirportsCache.put(airport.get().iataCode(), airport.get());

        }

        result.data().forEach(offer -> offer.itineraries()
                .forEach(i -> i.segments().forEach(s -> {
                    if (s.stops() != null && s.stops().size() > 0) {
                        s.stops().forEach(stop -> {
                            if (dictionaryAirportsCache.get(stop.iataCode()) == null) {
                                List<AmadeusAirportDTO> airportDTOs = getAirports(stop.iataCode());
                                Optional<AmadeusAirportDTO> airport = airportDTOs.stream()
                                        .filter(aP -> stop.iataCode().equals(aP.iataCode())).findFirst();
                                if (airportDTOs.size() < 1 || !airport.isPresent()) {
                                    dictionaryAirportsCache.put(stop.iataCode(),
                                            new AmadeusAirportDTO("Unknown Airport " + stop.iataCode(), stop.iataCode(),
                                                    new AmadeusAddressDTO("Unknown City", "Unknown Country")));

                                } else {
                                    dictionaryAirportsCache.put(stop.iataCode(), airport.get());
                                }

                            }
                        });
                    }

                })));

        return result.data().stream().map(flightOffer -> AmadeusMapper.mapAmadeusFlightOfferToFlightOffer(flightOffer,
                dictionaryAircrafts, dictionaryCarriers, dictionaryAirportsCache)).collect(Collectors.toList());
    }

    @Override
    public List<Airport> getAirportsByNameOrCode(String keyWord) {
        List<AmadeusAirportDTO> airportDTOs = getAirports(keyWord);
        return airportDTOs.stream().map(airportDTO -> {
            if (dictionaryAirportsCache.get(airportDTO.iataCode()) == null) {
                dictionaryAirportsCache.put(airportDTO.iataCode(), airportDTO);
            }
            return AmadeusMapper.amadeusAirportToDomainAirport(airportDTO);
        })
                .collect(Collectors.toList());
    }

    private List<AmadeusAirportDTO> getAirports(String keyWord) {
        String accessToken = authTokenManager.getAccessToken(webClient);
        AmadeusAirportSearchResponse resultAirports = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/reference-data/locations")
                        .queryParam("subType", "AIRPORT")
                        .queryParam("keyword", keyWord)
                        .build())
                .header("Authorization", authTokenManager.getTokenType() + " " + accessToken)
                .retrieve()
                .onStatus(status -> status.equals(HttpStatus.TOO_MANY_REQUESTS),
                        r -> Mono.delay(Duration.ofSeconds(2))
                                .then(Mono.error(new RuntimeException("Retrying due to rate limit"))))
                .bodyToMono(new ParameterizedTypeReference<AmadeusAirportSearchResponse>() {
                })
                .block();
        return resultAirports.data();
    }

}
