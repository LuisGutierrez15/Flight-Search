package com.gupiluan.backend_flightsearch.domain.port.in;

import java.util.List;

import com.gupiluan.backend_flightsearch.domain.model.Airport;
import com.gupiluan.backend_flightsearch.domain.model.CurrencyDomain;
import com.gupiluan.backend_flightsearch.domain.model.FlightOffer;
import com.gupiluan.backend_flightsearch.domain.model.FlightSearchCriteria;

public interface FlightSearchUseCase {

    /**
     * Searches for flights based on the provided flight search criteria.
     *
     * @param flightSearchCriteria the flight search criteria
     * @return a list of flight results matching the search criteria
     */
    List<FlightOffer> searchFlights(FlightSearchCriteria flightSearchCriteria);

    /**
     * 
     * @param airportCodeOrName entire or partial name of the airport or city
     * @return a list of airports matching the search criteria
     */
    List<Airport> searchAirports(String airportCodeOrName);

    /**
     * Retrieves a list of available currencies.
     *
     * @return a list of available currencies
     */
    List<CurrencyDomain> getCurrencies();

}
