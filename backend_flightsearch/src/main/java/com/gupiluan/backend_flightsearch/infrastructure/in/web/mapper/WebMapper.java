package com.gupiluan.backend_flightsearch.infrastructure.in.web.mapper;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.Comparator;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import com.gupiluan.backend_flightsearch.domain.model.Airline;
import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.Amenity;
import com.gupiluan.backend_flightsearch.domain.model.CurrencyDomain;
import com.gupiluan.backend_flightsearch.domain.model.FareDetails;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSegment;
import com.gupiluan.backend_flightsearch.domain.model.Itinerary;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebAirline;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebAirport;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebAmenity;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebArrival;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebCurreny;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebDeparture;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebFareDetails;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebFlightOffer;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebFlights;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebItinerary;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebSegment;
import com.gupiluan.backend_flightsearch.infrastructure.in.web.dto.WebStop;

public class WebMapper {

        public static WebFlights mapToWebFlights(List<FlightOffer> flights, String sortByPrice, String sortByDuration) {
                Comparator<WebFlightOffer> firstComparator = getComparator(WebFlightOffer::totalPrice, sortByPrice);
                Comparator<WebFlightOffer> secondComparator = getComparator(WebFlightOffer::duration,
                                sortByDuration);
                List<WebFlightOffer> webFlightOffers = flights.stream().map(offer -> {
                        String id = offer.id();
                        List<WebItinerary> itineraries = offer.itineraries().stream()
                                        .map(i -> mapWebItineraryFromDomainItinerary(i,
                                                        offer.travelerFares().get(0).fareDetails()))
                                        .collect(Collectors.toList());

                        BigDecimal price = offer.price().grandTotal() == null ? offer.price().total()
                                        : offer.price().grandTotal();
                        BigDecimal base = offer.price().base();
                        String currency = offer.price().currency();
                        BigDecimal basePerTraveler = offer.travelerFares().get(0).fare().base();
                        BigDecimal pricePerTraveler = offer.travelerFares().get(0).fare().grandTotal() == null
                                        ? offer.travelerFares().get(0).fare().total()
                                        : offer.travelerFares().get(0).fare().grandTotal();
                        BigDecimal fees = offer.price().fees();
                        Duration duration = itineraries.stream().map(itinerary -> itinerary.duration()).reduce(
                                        Duration.ZERO,
                                        Duration::plus);

                        return new WebFlightOffer(id, duration, base, price, basePerTraveler, pricePerTraveler,
                                        fees, mapWebAirlineFromDomainAirline(offer.mainAirline()), currency,
                                        itineraries);
                }).sorted(firstComparator.thenComparing(secondComparator))
                                .collect(Collectors.toList());

                return new WebFlights(webFlightOffers);
        }

        public static WebAirport mapWebAirportFromAirportDomain(Airport airport) {
                return new WebAirport(airport.name(), airport.iataCode(), airport.city(), airport.country());
        }

        private static <T, U extends Comparable<? super U>> Comparator<WebFlightOffer> getComparator(
                        Function<? super WebFlightOffer, ? extends U> keyStractor, String order) {
                Comparator<WebFlightOffer> defaultComparator = Comparator.comparing(e -> 0);
                Comparator<WebFlightOffer> resultComparator = Comparator.comparing(keyStractor,
                                Comparator.nullsLast(Comparator.naturalOrder()));
                resultComparator = order != null
                                ? order.equalsIgnoreCase("asc") ? resultComparator : resultComparator.reversed()
                                : defaultComparator;
                return resultComparator;
        }

        private static WebItinerary mapWebItineraryFromDomainItinerary(Itinerary itinerary,
                        List<FareDetails> fareDetails) {
                WebDeparture departureInfo = new WebDeparture(itinerary.segments().get(0).departureTime(),
                                mapWebAirportFromAirportDomain(itinerary.segments().get(0).departureAirport()));
                WebArrival arrivalInfo = new WebArrival(
                                itinerary.segments().get(itinerary.segments().size() - 1).arrivalTime(),
                                mapWebAirportFromAirportDomain(
                                                itinerary.segments().get(itinerary.segments().size() - 1)
                                                                .arrivalAirport()));
                WebAirline mainAirline = mapWebAirlineFromDomainAirline(itinerary.segments().get(0).marketingAirline());
                WebAirline operatingAirline = mapWebAirlineFromDomainAirline(
                                itinerary.segments().get(0).operatingAirline());

                List<WebSegment> segments = itinerary.segments().stream()
                                .map(segment -> mapWebSegmentFromDomainSegment(segment, fareDetails))
                                .collect(Collectors.toList());

                return new WebItinerary(itinerary.duration(), departureInfo, arrivalInfo, mainAirline, operatingAirline,
                                segments);
        }

        public static WebAirline mapWebAirlineFromDomainAirline(Airline airline) {
                return new WebAirline(airline.code(), airline.name());
        }

        public static WebSegment mapWebSegmentFromDomainSegment(FlightSegment segment,
                        List<FareDetails> fareDetailsList) {
                String id = segment.id();
                WebDeparture departureInfo = new WebDeparture(segment.departureTime(),
                                mapWebAirportFromAirportDomain(segment.departureAirport()));
                WebArrival arrivalInfo = new WebArrival(segment.arrivalTime(),
                                mapWebAirportFromAirportDomain(segment.arrivalAirport()));
                WebAirline mainAirline = mapWebAirlineFromDomainAirline(segment.marketingAirline());
                WebAirline operatingAirline = mapWebAirlineFromDomainAirline(segment.operatingAirline());
                String flightNumber = segment.flightNumber();
                String aircraft = segment.aircraftType();
                List<WebStop> stops = segment.stops().stream()
                                .map(stop -> new WebStop(mapWebAirportFromAirportDomain(stop.airport()),
                                                stop.duration()))
                                .collect(Collectors.toList());
                FareDetails fareDetails = fareDetailsList.stream()
                                .filter(fd -> fd.segmentId().equalsIgnoreCase(segment.id()))
                                .findFirst().orElse(null);
                Duration duration = segment.flightDuration();

                return new WebSegment(id, departureInfo, duration, arrivalInfo, mainAirline, operatingAirline,
                                flightNumber,
                                aircraft,
                                stops,
                                mapWebFareDetailsFromDomainFareDetails(fareDetails));
        }

        private static WebFareDetails mapWebFareDetailsFromDomainFareDetails(FareDetails fareDetails) {
                if (fareDetails == null) {
                        return null;
                }
                List<Amenity> amenities = fareDetails.amenities();
                List<WebAmenity> webAmenities = amenities.stream()
                                .map(amenity -> new WebAmenity(amenity.name(), amenity.isChargeable()))
                                .collect(Collectors.toList());
                return new WebFareDetails(fareDetails.cabin(), fareDetails.fareClass(), webAmenities);

        }

        public static WebCurreny mapWebCurrenciesFromCurrenciesDomain(CurrencyDomain currency) {
                return new WebCurreny(currency.code(), currency.displayName());

        }

}
