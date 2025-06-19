import Stepper, { Step } from "../components/Stepper";
import FlightDatePicker from "../components/FlightDatePicker";
import AirportSearch from "../components/AirportSearch";
import Background from "../components/Background";
import Layout from "../layout/Layout";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "../components/Loader";
import CheckBox from "../components/CheckBox";
import { useFetchCurrencies } from "../hooks/useFetchCurrencies";
import { useFetchFlightOffers } from "../hooks/useFetchFlightOffers";

const SearchPage = () => {
  const { currencies } = useFetchCurrencies();
  const {
    searchHandler,
    canMoveFoward,
    isRoundTrip,
    selectedDates,
    onAdultsChangeHanlder,
    onCurrencyChangeHandler,
    onDateChangeHandler,
    onNonStopChangeHandler,
    isFetching,
    error,
    adults_,
    currency,
    origin,
    destination,
    originAirportHandler,
    destinationAirportHandler,
    isOneWayFlight,
    isRoundTripFlight,
  } = useFetchFlightOffers();

  return (
    <Layout>
      <Background />
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={searchHandler}
        backButtonText="Previous"
        nextButtonText="Next"
        disableStepIndicators={true}
        canMoveFoward={canMoveFoward}
      >
        {/* Step 1 */}
        <Step>
          <h1 className="font-bold dark:text-gray-200">Welcome!</h1>
          <h2 className="font-bold text-sm text-gray-600 dark:text-gray-400">
            Let's find the best offer!
          </h2>
          {origin !== undefined &&
            destination !== undefined &&
            origin === destination && (
              <div className="text-red-500">Joking, right?</div>
            )}
          <AirportSearch
            label="Origin"
            value={origin}
            onChange={originAirportHandler}
          />
          <AirportSearch
            label="Destination"
            value={destination}
            onChange={destinationAirportHandler}
          />
        </Step>
        {/* Step 2 */}
        <Step>
          <h1 className="font-bold dark:text-gray-200">
            Are you planning to go back?
          </h1>
          <div className="flex flex-row container justify-evenly p-4">
            <Button pressed={!isRoundTrip} onClick={isOneWayFlight}>
              One Way
            </Button>
            <Button pressed={isRoundTrip} onClick={isRoundTripFlight}>
              Round-Trip
            </Button>
          </div>
        </Step>
        {/* Step 3 */}
        <Step>
          <h1 className="font-bold dark:text-gray-200">Select your date</h1>

          <FlightDatePicker
            roundTrip={isRoundTrip}
            onDateChange={onDateChangeHandler}
            selectedDates={selectedDates}
          />

          {selectedDates.departureDate && (
            <div style={{ marginTop: "1rem" }}>
              <p className="font-semibold px-2">
                Departure Date: {selectedDates.departureDate.toDateString()}
              </p>
              {selectedDates.returnDate && (
                <p className="font-semibold px-2">
                  Return Date: {selectedDates.returnDate.toDateString()}
                </p>
              )}
            </div>
          )}
        </Step>
        {/* Step 4 */}
        <Step>
          <h1 className="font-bold dark:text-gray-200">Final Step</h1>
          <p className="dark:text-gray-400 mb-2">
            Please select how many adults and the currency (required) and if you
            are thinking of a non-stop flight
          </p>
          <div className="p-2 justify-evenly flex flex-col space-y-5">
            <Input
              placeholder="0"
              type="number"
              label="Adults (max 9)"
              value={adults_.toString()}
              onChange={onAdultsChangeHanlder}
            />
            <div className="flex rounded-lg border-2 border-solid border-gray-100 dark:border-gray-700 items-center bg-gray-100 dark:bg-gray-900">
              <input
                placeholder={
                  currency
                    ? currencies.find((c) => c.code === currency)?.displayName
                    : "Select your currency"
                }
                readOnly
                className="w-9/12 h-14 px-4   dark:text-white focus:outline-none cursor-no-drop"
              />
              <select
                className="w-3/12 px-4 h-full  dark:text-white appearance-none border-l-2 border-gray-300 dark:border-gray-700  focus:outline-none text-lg"
                onChange={onCurrencyChangeHandler}
              >
                <option value={""}>↓</option>
                {currencies?.map((c, i) => (
                  <option key={i} value={c.code}>
                    {c.code}
                  </option>
                ))}
              </select>
            </div>

            <CheckBox onChange={onNonStopChangeHandler} label="Non-Stop" />
          </div>
        </Step>

        {isFetching && <Loader />}
      </Stepper>
      {error.length > 0 && (
        <div className="text-red-400 text-md font-bold mb-3.5 text-center">
          {error}
          <button
            className="rounded p-2 bg-gray-500 mx-3.5"
            onClick={searchHandler}
          >
            Try again
          </button>
        </div>
      )}
    </Layout>
  );
};

export default SearchPage;
