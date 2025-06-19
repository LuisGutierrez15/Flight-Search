package com.gupiluan.backend_flightsearch.infrestructure.in.web.controller;

import com.gupiluan.backend_flightsearch.application.FlightSearchService;
import com.gupiluan.backend_flightsearch.domain.model.Airline;
import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.Amenity;
import com.gupiluan.backend_flightsearch.domain.model.CurrencyDomain;
import com.gupiluan.backend_flightsearch.domain.model.FareDetails;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSearchCriteria;
import com.gupiluan.backend_flightsearch.domain.model.FlightSegment;
import com.gupiluan.backend_flightsearch.domain.model.Itinerary;
import com.gupiluan.backend_flightsearch.domain.model.Price;
import com.gupiluan.backend_flightsearch.domain.model.Stop;
import com.gupiluan.backend_flightsearch.domain.model.TravelerFare;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.controller.FlightSearchController;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;

import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(FlightSearchController.class)
class FlightSearchControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockitoBean
        private FlightSearchService flightSearchService;

        @Test
        @DisplayName("GET /api/v1/flightsearch/hello - should return Hello World")
        void helloWorld_ShouldReturnHelloWorld() throws Exception {
                mockMvc.perform(get("/api/v1/flightsearch/hello"))
                                .andExpect(status().isOk())
                                .andExpect(content().string("Hello World!"));
        }

        @Test
        @DisplayName("GET /api/v1/flightsearch/search - should return flight search result")
        void searchFlights_ShouldReturnFlights() throws Exception {
                Airport origin = new Airport("New York International Airport", "JFK", "New York", "United States");
                Airport destination = new Airport("Los Angeles International Airport", "LAX", "Los Angeles",
                                "United States");

                Airline airline = new Airline("American Airlines", "AA");
                List<Stop> stops = List.of();
                FlightSegment segment1 = new FlightSegment(
                                "1",
                                LocalDate.now().plusDays(10).atTime(13, 0).toString(),
                                origin,
                                "Terminal 4",
                                LocalDate.now().plusDays(10).atTime(16, 0).toString(),
                                destination,
                                "Terminal 5",
                                airline,
                                airline,
                                "AA 123",
                                "Boeing 777",
                                Duration.parse("PT3H"),
                                stops);
                FlightSegment segment2 = new FlightSegment(
                                "2",
                                LocalDate.now().plusDays(20).atTime(10, 0).toString(),
                                destination,
                                "Terminal 5",
                                LocalDate.now().plusDays(20).atTime(13, 0).toString(),
                                origin,
                                "Terminal 1",
                                airline,
                                airline,
                                "AA456",
                                "Boeing 737",
                                Duration.parse("PT3H"),
                                stops);
                Itinerary itinerary1 = new Itinerary(Duration.parse("PT3H"), List.of(segment1));
                Itinerary itinerary2 = new Itinerary(Duration.parse("PT3H"), List.of(segment2));

                List<Itinerary> itineraries = List.of(
                                itinerary1, itinerary2);

                List<Amenity> amenities = List.of(new Amenity("test", true));
                List<FareDetails> details = List
                                .of(new FareDetails("1", "test", "testC", "test", "brandtest", amenities));
                List<TravelerFare> travelerFares = List.of(new TravelerFare("1", "test", "option",
                                new Price("USD", BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO, BigDecimal.ZERO),
                                details));
                List<FlightOffer> expectedFlights = List.of(new FlightOffer("1",

                                9,
                                itineraries,
                                itineraries.get(0).segments().get(0).operatingAirline(),
                                new Price("USD",
                                                BigDecimal.valueOf(100.00),
                                                BigDecimal.valueOf(120.00),
                                                BigDecimal.valueOf(120.00), BigDecimal.ZERO),
                                travelerFares));

                Mockito.when(flightSearchService.searchFlights(any(FlightSearchCriteria.class)))
                                .thenReturn(expectedFlights);

                mockMvc.perform(get("/api/v1/flightsearch/search")
                                .param("origin", "JFK")
                                .param("destination", "LAX")
                                .param("departureDate", "2025-07-01")
                                .param("adults", "1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value("Flight search successful"));
        }

        @Test
        @DisplayName("GET /api/v1/flightsearch/currencies - should return list of currencies")
        void getCurrencies_ShouldReturnCurrencyList() throws Exception {
                Mockito.when(flightSearchService.getCurrencies())
                                .thenReturn(List.of(new CurrencyDomain("USD", "US Dollar")));

                mockMvc.perform(get("/api/v1/flightsearch/currencies"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value("sucess"));
        }

        @Test
        @DisplayName("GET /api/v1/flightsearch/airports/{keyWord} - should return airport list")
        void searchAirports_ShouldReturnAirports() throws Exception {
                Mockito.when(flightSearchService.searchAirports("NYC"))
                                .thenReturn(List.of(new Airport("John F. Kennedy International Airport", "JFK",
                                                "New York", "United States")));

                mockMvc.perform(get("/api/v1/flightsearch/airports/NYC"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.message").value("Airports found"));
        }

        @Test
        @DisplayName("GET /api/v1/flightsearch/airports/{keyWord} - should return 404 if no airports found")
        void searchAirports_ShouldReturnNotFoundIfNone() throws Exception {
                Mockito.when(flightSearchService.searchAirports("XYZ")).thenReturn(Collections.emptyList());

                mockMvc.perform(get("/api/v1/flightsearch/airports/XYZ"))
                                .andExpect(status().isNotFound())
                                .andExpect(jsonPath("$.message").value("No airports found"));
        }
}
