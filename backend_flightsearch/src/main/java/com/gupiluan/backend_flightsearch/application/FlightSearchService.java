package com.gupiluan.backend_flightsearch.application;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.CurrencyDomain;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSearchCriteria;
import com.gupiluan.backend_flightsearch.domain.port.in.FlightSearchUseCase;
import com.gupiluan.backend_flightsearch.domain.port.out.FlightSearchClientPort;

/**
 * Service class for handling flight search operations.
 */

@Service
public class FlightSearchService implements FlightSearchUseCase {
    private final FlightSearchClientPort flightSearchClientPort;

    public FlightSearchService(FlightSearchClientPort flightSearchClientPort) {
        this.flightSearchClientPort = flightSearchClientPort;
    }

    @Override
    @Cacheable("flightOffers")
    public List<FlightOffer> searchFlights(FlightSearchCriteria flightSearchCriteria) {
        if (!flightSearchCriteria.destinationCode().equalsIgnoreCase(flightSearchCriteria.originCode())) {
            return flightSearchClientPort.fetchFlights(flightSearchCriteria);
        }
        return null;
    }

    @Override
    @Cacheable("airports")
    public List<Airport> searchAirports(String airportCodeOrName) {
        return flightSearchClientPort.getAirportsByNameOrCode(airportCodeOrName);
    }

    @Override
    public List<CurrencyDomain> getCurrencies() {
        return flightSearchClientPort.getCurrencies();
    }

}
