package com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.mapper;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.gupiluan.backend_flightsearch.domain.model.Airline;
import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.Amenity;
import com.gupiluan.backend_flightsearch.domain.model.FareDetails;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSegment;
import com.gupiluan.backend_flightsearch.domain.model.Itinerary;
import com.gupiluan.backend_flightsearch.domain.model.Price;
import com.gupiluan.backend_flightsearch.domain.model.Stop;
import com.gupiluan.backend_flightsearch.domain.model.TravelerFare;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusAirportDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusFlightOfferDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusFlightStopDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusItineraryDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusOperatingDTO;
import com.gupiluan.backend_flightsearch.infrastructure.out.api.amadeus.dto.AmadeusTravelerPricingDTO;

public class AmadeusMapper {
        public static FlightOffer mapAmadeusFlightOfferToFlightOffer(AmadeusFlightOfferDTO amadeusFlightOffer,
                        Map<String, String> dictionaryAircrafts, Map<String, String> dictionaryCarriers,
                        Map<String, AmadeusAirportDTO> dictionaryAirports) {
                String id = amadeusFlightOffer.id();
                int availableSeats = amadeusFlightOffer.numberOfBookableSeats();
                Price price = new Price(amadeusFlightOffer.price().currency(),
                                amadeusFlightOffer.price().total(),
                                amadeusFlightOffer.price().base(),
                                amadeusFlightOffer.price().grandTotal(),
                                (amadeusFlightOffer.price().fees().stream().map(fee -> fee.amount()).reduce(
                                                BigDecimal.ZERO,
                                                BigDecimal::add)));
                Airline mainAirline = new Airline(
                                amadeusFlightOffer.itineraries().get(0).segments().get(0).carrierCode(),
                                dictionaryCarriers.get(amadeusFlightOffer.itineraries().get(0).segments().get(0)
                                                .carrierCode()));
                List<Itinerary> itineraries = amadeusItineraryToDomainItinerary(amadeusFlightOffer.itineraries(),
                                dictionaryAircrafts, dictionaryCarriers, dictionaryAirports);

                List<TravelerFare> travelerFares = amadeusTravelerPricingTravelerFare(
                                amadeusFlightOffer.travelerPricings());

                return new FlightOffer(id, availableSeats, itineraries, mainAirline, price, travelerFares);

        }

        private static List<Itinerary> amadeusItineraryToDomainItinerary(List<AmadeusItineraryDTO> amadeusItinerary,
                        Map<String, String> dictionaryAircrafts, Map<String, String> dictionaryCarriers,
                        Map<String, AmadeusAirportDTO> dictionaryAirports) {
                return amadeusItinerary.stream()
                                .map(itinerary -> new Itinerary(Duration.parse(itinerary.duration()), itinerary
                                                .segments().stream()
                                                .map(segment -> {
                                                        AmadeusOperatingDTO operating = segment.operating();
                                                        List<AmadeusFlightStopDTO> stops = segment.stops();
                                                        String id = segment.id();
                                                        String departureDateTime = segment.departure().at();
                                                        String departureAirportCode = segment.departure().iataCode();
                                                        String departureTerminal = segment.departure().terminal();
                                                        String arrivalDateTime = segment.arrival().at();
                                                        String arrivalAirportCode = segment.arrival().iataCode();
                                                        String arrivalTerminal = segment.arrival().terminal();
                                                        String flightNumber = segment.carrierCode() + " "
                                                                        + segment.number();
                                                        String mainAirlineCode = segment.carrierCode();
                                                        String operatingAirlineCode = operating != null
                                                                        ? operating.carrierCode()
                                                                        : mainAirlineCode;
                                                        String airCraftCode = segment.aircraft().code();
                                                        String duration = segment.duration();

                                                        return new FlightSegment(id,
                                                                        departureDateTime,
                                                                        amadeusAirportToDomainAirport(dictionaryAirports
                                                                                        .get(departureAirportCode)),
                                                                        departureTerminal,
                                                                        arrivalDateTime,
                                                                        amadeusAirportToDomainAirport(dictionaryAirports
                                                                                        .get(arrivalAirportCode)),
                                                                        arrivalTerminal,
                                                                        new Airline(mainAirlineCode,
                                                                                        dictionaryCarriers.get(
                                                                                                        mainAirlineCode)),

                                                                        new Airline(operatingAirlineCode,
                                                                                        dictionaryCarriers.get(
                                                                                                        operatingAirlineCode)),

                                                                        flightNumber,
                                                                        dictionaryAircrafts
                                                                                        .get(airCraftCode),
                                                                        Duration.parse(duration),
                                                                        stops != null ? stops
                                                                                        .stream()
                                                                                        .map(stop -> new Stop(
                                                                                                        stop.duration(),
                                                                                                        amadeusAirportToDomainAirport(
                                                                                                                        dictionaryAirports
                                                                                                                                        .get(stop.iataCode()))))
                                                                                        .collect(Collectors.toList())
                                                                                        : List.of());

                                                })
                                                .collect(Collectors.toList())))
                                .collect(Collectors.toList());
        }

        private static List<TravelerFare> amadeusTravelerPricingTravelerFare(
                        List<AmadeusTravelerPricingDTO> amadeusTravelerPricing) {
                return amadeusTravelerPricing.stream()
                                .map(traveler -> new TravelerFare(traveler.travelerId(),
                                                traveler.travelerType(),
                                                traveler.fareOption(),
                                                new Price(traveler.price().currency(),
                                                                traveler.price().total(),
                                                                traveler.price().base(),
                                                                traveler.price().grandTotal(),
                                                                traveler.price().fees() == null ? null
                                                                                : traveler.price().fees().stream()
                                                                                                .map(fee -> fee.amount())
                                                                                                .reduce(
                                                                                                                BigDecimal.ZERO,
                                                                                                                BigDecimal::add)),
                                                traveler.fareDetailsBySegment().stream()
                                                                .map(details -> new FareDetails(details.segmentId(),
                                                                                details.cabin(),
                                                                                details.clazz(),
                                                                                details.fareBasis(),
                                                                                details.brandedFare(),
                                                                                details.amenities() != null
                                                                                                ? details.amenities()
                                                                                                                .stream()
                                                                                                                .map(amenity -> new Amenity(
                                                                                                                                amenity.description(),
                                                                                                                                amenity.isChargeable()))
                                                                                                                .collect(Collectors
                                                                                                                                .toList())
                                                                                                : (List.of())))
                                                                .collect(Collectors.toList())))
                                .collect(Collectors.toList());
        }

        public static Airport amadeusAirportToDomainAirport(AmadeusAirportDTO airportDTO) {
                return new Airport(airportDTO.name(), airportDTO.iataCode(), airportDTO.address().cityName(),
                                airportDTO.address().countryName());
        }

}