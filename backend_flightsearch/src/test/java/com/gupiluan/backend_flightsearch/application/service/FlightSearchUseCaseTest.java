package com.gupiluan.backend_flightsearch.application.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.gupiluan.backend_flightsearch.application.FlightSearchService;
import com.gupiluan.backend_flightsearch.domain.model.Airline;
import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.Amenity;
import com.gupiluan.backend_flightsearch.domain.model.FareDetails;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSearchCriteria;
import com.gupiluan.backend_flightsearch.domain.model.FlightSegment;
import com.gupiluan.backend_flightsearch.domain.model.Itinerary;
import com.gupiluan.backend_flightsearch.domain.model.Price;
import com.gupiluan.backend_flightsearch.domain.model.Stop;
import com.gupiluan.backend_flightsearch.domain.model.TravelerFare;
import com.gupiluan.backend_flightsearch.domain.port.in.FlightSearchUseCase;
import com.gupiluan.backend_flightsearch.domain.port.out.FlightSearchClientPort;

@ExtendWith(MockitoExtension.class)
public class FlightSearchUseCaseTest {

        @Mock
        private FlightSearchClientPort flightSearchClientPort;
        private FlightSearchUseCase useCase;

        @BeforeEach
        public void setUp() {
                this.useCase = new FlightSearchService(flightSearchClientPort);
        }

        @Test
        public void testSearchFlights() {

                FlightSearchCriteria criteria = new FlightSearchCriteria("JFK",
                                "LAX",
                                LocalDate.now().plusDays(10),
                                LocalDate.now().plusDays(20),
                                1,
                                "USD",
                                false);

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

                when(flightSearchClientPort.fetchFlights(criteria)).thenReturn(expectedFlights);

                List<FlightOffer> actualFlights = useCase.searchFlights(criteria);

                assertEquals(expectedFlights, actualFlights,
                                "The flight search results should match the expected results.");

        }

        @Test
        public void testSearchFlightsWithSameOriginAndDestination() {
                try {
                        FlightSearchCriteria criteria = new FlightSearchCriteria("NYC",
                                        "NYC",
                                        LocalDate.now().plusDays(10),
                                        LocalDate.now().plusDays(20),
                                        1,
                                        "USD",
                                        false);
                        useCase.searchFlights(criteria);
                } catch (IllegalArgumentException e) {
                        assertEquals("Origin and destination cannot be the same", e.getMessage(),
                                        "Should throw an exception for same origin and destination.");
                }
        }

        @Test
        public void testSearchFlightsWithInvalidCriteria() {
                try {
                        FlightSearchCriteria criteria = new FlightSearchCriteria("NYC",
                                        "LAX",
                                        LocalDate.now().minusDays(1), // Invalid departure date
                                        LocalDate.now().plusDays(20),
                                        1,
                                        "USD",
                                        false);
                        useCase.searchFlights(criteria);
                } catch (IllegalArgumentException e) {
                        assertEquals("Departure date invalid", e.getMessage(),
                                        "Should throw an exception for invalid departure date.");
                }
        }
}
