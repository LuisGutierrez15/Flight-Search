package com.gupiluan.backend_flightsearch.infrastructure.in.web.controller;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gupiluan.backend_flightsearch.application.FlightSearchService;
import com.gupiluan.backend_flightsearch.common.ApiResponse;
import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.CurrencyDomain;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSearchCriteria;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebAirportSearch;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebCurreny;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebFlights;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.mapper.WebMapper;

@RestController
@RequestMapping("/api/v1/flightsearch")
@CrossOrigin(origins = "*")
public class FlightSearchController {
    private final FlightSearchService flightSearchService;

    public FlightSearchController(FlightSearchService flightSearchService) {
        this.flightSearchService = flightSearchService;
    }

    @GetMapping("/hello")
    public ResponseEntity<String> helloWorld() {
        return ResponseEntity.ok("Hello World!");
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse> searchFlights(
            @RequestParam String origin,
            @RequestParam String destination,
            @RequestParam LocalDate departureDate,
            @RequestParam(required = false) LocalDate returnDate,
            @RequestParam int adults,
            @RequestParam(required = false, defaultValue = "false") boolean nonStop,
            @RequestParam(required = false, defaultValue = "USD") String currency,
            @RequestParam(required = false) String sortByPrice,
            @RequestParam(required = false) String sortByDuration) {
        FlightSearchCriteria flightSearch = new FlightSearchCriteria(origin, destination, departureDate, returnDate,
                adults, currency,
                nonStop);
        List<FlightOffer> flightOffers = flightSearchService.searchFlights(flightSearch);
        HttpStatus status = flightOffers == null ? HttpStatus.BAD_REQUEST
                : flightOffers.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        String message = flightOffers == null ? "Flight search failed"
                : flightOffers.size() > 0 ? "Flight search successful" : "No flights found";
        WebFlights webFlights = WebMapper.mapToWebFlights(flightOffers, sortByPrice, sortByDuration);
        ApiResponse apiResponse = new ApiResponse(status.value(), message, webFlights);
        return ResponseEntity.status(apiResponse.status()).body(apiResponse);
    }

    @GetMapping("/currencies")
    public ResponseEntity<ApiResponse> getCurrencies() {
        List<CurrencyDomain> currencies = flightSearchService.getCurrencies();
        List<WebCurreny> webCurrenies = currencies.stream().map(WebMapper::mapWebCurrenciesFromCurrenciesDomain)
                .collect(Collectors.toList());
        ApiResponse response = new ApiResponse(HttpStatus.OK.value(), "sucess", webCurrenies);
        return ResponseEntity.status(response.status()).body(response);
    }

    @GetMapping("/airports/{keyWord}")
    public ResponseEntity<ApiResponse> searchAirports(
            @PathVariable String keyWord) {
        List<Airport> airports = flightSearchService.searchAirports(keyWord);
        WebAirportSearch response = new WebAirportSearch(
                airports.stream().map(WebMapper::mapWebAirportFromAirportDomain).collect(Collectors.toList()));
        HttpStatus status = airports.size() > 0 ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        String message = airports.size() > 0 ? "Airports found" : "No airports found";
        ApiResponse apiResponse = new ApiResponse(status.value(), message, response);
        return ResponseEntity.status(apiResponse.status()).body(apiResponse);
    }

}
