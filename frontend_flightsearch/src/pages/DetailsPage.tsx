import { formatISODuration, formatPrice } from "../utils/formatters";
import { useSelector } from "react-redux";
import { selectFlightOffer } from "../store/selectors/selectFlightOffer";
import Layout from "../layout/Layout";
import Background from "../components/Background";
import { useNavigate } from "react-router-dom";

const DetailsPage = () => {
  const offer = useSelector(selectFlightOffer);

  const navigate = useNavigate();
  return (
    <Layout>
      <Background />
      <button
        onClick={() => navigate(-1)} // goes back one page
        className="fixed bottom-13 left-3.5 m-3 p-2 bg-[#6200ea] text-white rounded max-h-3/5 flex-shrink-0 cursor-pointer z-10"
      >
        Go Back
      </button>

      <div className="p-4 max-w-4xl w-full mx-auto space-y-6 overflow-y-auto font-sans text-gray-800 dark:text-gray-200 z-10 ">
        {offer.itineraries.map((itinerary, idx) => (
          <div
            key={idx}
            className="bg-gray-50 rounded-xl shadow-md p-4 space-y-4 dark:bg-gray-800 dark:shadow-lg"
          >
            <p className="text-lg font-bold text-[#6200ea] dark:text-[#ba92f2]">
              {idx === 0 ? "Outbound Flight" : "Inbound Flight"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Duration: {formatISODuration(itinerary.duration)}
            </p>

            {itinerary.segments.map((seg) => (
              <div
                key={seg.id}
                className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between gap-4 bg-gray-200 dark:bg-gray-900 dark:border-gray-700"
              >
                {/* Segment Info */}
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Segment {seg.id}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(seg.departure.departureTime).toUTCString()} →{" "}
                    {new Date(seg.arrival.arrivalTime).toUTCString()}
                  </p>
                  <p className="text-md font-medium dark:text-gray-200">
                    {seg.departure.departureAirport.city} (
                    {seg.departure.departureAirport.iataCode}) →{" "}
                    {seg.arrival.arrivalAirport.city} (
                    {seg.arrival.arrivalAirport.iataCode})
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    {seg.operatingAirline.name} Flight {seg.flightNumber} —{" "}
                    {formatISODuration(seg.duration)}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    Aircraft: {seg.aircraft}
                  </p>

                  {seg.stops.length > 0 &&
                    seg.stops.map((stop, i) => (
                      <p
                        key={i}
                        className="text-sm text-gray-600 dark:text-gray-500"
                      >
                        ✈ Stop: {stop.airport.iataCode} ({stop.airport.city},{" "}
                        {stop.airport.country}) —{" "}
                        {formatISODuration(stop.stopDuration)}
                      </p>
                    ))}
                </div>

                {/* Fare Details */}
                <div className="flex-1 sm:max-w-xs border rounded p-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 border-white">
                  <p className="font-semibold text-sm mb-1 text-[#6200ea] dark:text-[#a277de]">
                    Traveler Fare
                  </p>

                  <p className="text-sm dark:text-gray-300">
                    Cabin: {seg.details.cabin}
                  </p>
                  <p className="text-sm dark:text-gray-300">
                    Class: {seg.details.fareClass}
                  </p>
                  <p className="text-sm font-bold mt-2 dark:text-gray-200">
                    Amenities:
                  </p>
                  {seg.details.amenities.length > 0 ? (
                    seg.details.amenities.map((amenity, i) => (
                      <p key={i} className="text-sm dark:text-gray-300">
                        {amenity.name}:{" "}
                        <span
                          className={
                            amenity.isChargeable
                              ? "text-red-600 dark:text-red-400"
                              : "text-green-600 dark:text-green-400"
                          }
                        >
                          {amenity.isChargeable ? "WITH COST" : "FREE"}
                        </span>
                      </p>
                    ))
                  ) : (
                    <p className="text-sm text-amber-600 dark:text-amber-400">
                      None
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-xl shadow-md p-4 flex flex-col sm:flex-row justify-between gap-4 dark:bg-gray-800 dark:shadow-lg">
          <div className="flex-1">
            <p className="text-md font-bold text-[#6200ea] mb-2 dark:text-[#ba92f2]">
              Price Breakdown
            </p>
            <p className="text-sm dark:text-gray-300">
              Base: {formatPrice(offer?.basePrice, offer.currency)}
            </p>
            <p className="text-sm dark:text-gray-300">
              Fees: {formatPrice(offer?.fees, offer.currency)}
            </p>
            <p className="text-sm font-bold dark:text-gray-100">
              Total: {formatPrice(offer?.totalPrice, offer.currency)}
            </p>
          </div>
          <div className="flex-1 sm:max-w-xs border rounded p-3 bg-gray-200 dark:bg-gray-900 dark:border-gray-700 border-white">
            <p className="text-md font-bold text-[#6200ea] mb-2 dark:text-[#ba92f2]">
              Per Traveler
            </p>
            <p className="text-sm dark:text-gray-300">
              Base: {formatPrice(offer?.basePricePerTraveler, offer.currency)}
            </p>
            <p className="text-sm font-bold dark:text-gray-100">
              Total: {formatPrice(offer?.totalPricePerTraveler, offer.currency)}
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DetailsPage;
