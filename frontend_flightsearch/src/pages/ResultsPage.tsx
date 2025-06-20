import { useNavigate } from "react-router-dom";
import Carousel, { type CarouselItem } from "../components/Carousel";
import Layout from "../layout/Layout";
import Background from "../components/Background";
import { formatISODuration, formatPrice } from "../utils/formatters";
import SortToggle from "../components/SortToggle";
import { useDispatch, useSelector } from "react-redux";
import {
  resetAll,
  setSortByDuration,
  setSortByPrice,
} from "../store/slices/flightSearchCriteriaSlice";
import { useEffect } from "react";
import { selectFlightSearchCriteria } from "../store/selectors/selectFlightSearchCriteria";
import { setflightOffer } from "../store/slices/flightOfferSlice";
import { fetchData } from "../api/FlightSearchService";
import { selectFlightSearchResults } from "../store/selectors/selectFlightSearchResults";
import {
  addVisited,
  resetResults,
  setFlightSearchResults,
} from "../store/slices/flightSearchResultsSlice";

const ResultsPage = () => {
  const results = useSelector(selectFlightSearchResults);
  const offers = results.flightOffers;
  const dispatch = useDispatch();
  const searchCriteria = useSelector(selectFlightSearchCriteria);
  const { sortByDuration, sortByPrice } = searchCriteria;

  useEffect(() => {
    const sortBy = async () => {
      try {
        const response = await fetchData(searchCriteria);
        dispatch(setFlightSearchResults(response.offers));
      } catch {
        console.log("Error fetching data");
      }
    };
    sortBy();
  }, [sortByDuration, sortByPrice]);

  const navigate = useNavigate();

  const carouselItems: CarouselItem[] = offers.map((offer) => {
    const alReadyVisited = results.visited.includes(offer.offerId);
    const buttonVisited = alReadyVisited
      ? "bg-purple-700 hover:bg-purple-600 dark:bg-purple-300 dark:hover:bg-purple-400"
      : "bg-blue-700 hover:bg-blue-600 dark:bg-blue-300 dark:hover:bg-blue-400";
    const bgVisited = alReadyVisited
      ? "bg-violet-400 dark:bg-purple-900"
      : "bg-blue-400 dark:bg-gray-900 border-gray-700";
    return {
      title: `Offer ${offer.offerId} Sold by: ${offer.mainAirline.name} (${offer.mainAirline.code})`,
      id: offer.offerId,
      description: `Total duration: ${formatISODuration(offer.duration)}`,
      details: (
        <button
          className={`p-4 rounded-lg font-semibold transition-colors duration-300text-white ${buttonVisited} dark:text-gray-900 shadow-lg cursor-pointer text-white`}
          onClick={() => {
            dispatch(addVisited(offer.offerId));
            dispatch(setflightOffer(offer));
            navigate("/details");
          }}
        >
          Details
        </button>
      ),
      icon: (
        <div
          className={`max-w-4xl mx-auto h-full p-4 rounded-lg shadow-sm border ${bgVisited} dark:text-white space-y-6 overflow-y-auto max-h-screen`}
        >
          {/* Itineraries */}
          {offer.itineraries.map((itinerary, idx) => (
            <div
              key={idx}
              className="border-b border-gray-200 last:border-none pb-4"
            >
              {/* Segments */}
              {itinerary.segments.map((segment, sIdx) => (
                <div
                  key={sIdx}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm text-gray-100 font-medium">
                      {new Date(segment.departure.departureTime).toUTCString()}{" "}
                      - {new Date(segment.arrival.arrivalTime).toUTCString()}
                    </p>
                    <p className="text-base font-semibold">
                      {segment.departure.departureAirport.city} (
                      {segment.departure.departureAirport.iataCode}) →{" "}
                      {segment.arrival.arrivalAirport.city} (
                      {segment.arrival.arrivalAirport.iataCode})
                    </p>
                    <p className="text-sm text-gray-200">
                      {formatISODuration(segment.duration)}{" "}
                      {segment.stops.length > 0
                        ? `(${segment.stops.length} stop${
                            segment.stops.length > 1 ? "s" : ""
                          })`
                        : "(non-stop)"}
                    </p>
                    {segment.stops.map((stop, stopIdx) => (
                      <p key={stopIdx} className="text-xs text-gray-300">
                        {formatISODuration(stop.stopDuration)} in{" "}
                        {stop.airport.city} ({stop.airport.iataCode})
                      </p>
                    ))}
                  </div>
                  <div className="mt-2 sm:mt-0 text-right">
                    <div className="text-sm text-gray-800 dark:text-violet-300 font-medium">
                      {segment.operatingAirline.name ||
                        segment.mainAirline.name}{" "}
                      (
                      {segment.operatingAirline.code ||
                        segment.mainAirline.code}
                      )
                    </div>
                    <div className="text-xs text-gray-700 dark:text-violet-400 font-light">
                      Flight {segment.flightNumber}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
          {/* Price section */}

          <div className="flex flex-col sm:flex-row justify-end gap-6 text-right">
            <div>
              <p className="text-sm text-gray-300">Total</p>
              <p className="text-lg font-bold text-white">
                {formatPrice(offer.totalPrice, offer.currency)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-300">Per Traveler</p>
              <p className="text-lg font-bold text-white">
                {formatPrice(offer.totalPricePerTraveler, offer.currency)}
              </p>
            </div>
          </div>
        </div>
      ),
    };
  });
  return (
    <Layout>
      <Background />
      <button
        onClick={() => {
          dispatch(resetAll());
          dispatch(resetResults());
          navigate("/");
        }}
        className="fixed bottom-13 left-3.5 m-3 p-2 bg-[#6200ea] text-white rounded max-h-3/5 flex-shrink-0 cursor-pointer z-10"
      >
        New Search
      </button>

      <div className="flex flex-col items-center p-4 rounded-lg">
        <div className="md:absolute flex md:flex-col flex-row justify-evenly w-full gap-2 md:gap-4 px-5">
          <SortToggle
            title="Price"
            onChange={(v) => dispatch(setSortByPrice(v))}
          />
          <SortToggle
            title="Duration"
            onChange={(v) => dispatch(setSortByDuration(v))}
          />
        </div>

        <div className="w-full h-auto shadow rounded-t-lg mt-4"></div>

        <Carousel items={carouselItems} />
      </div>
    </Layout>
  );
};

export default ResultsPage;
