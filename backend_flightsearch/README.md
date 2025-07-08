# Flight Search Backend

This is a Spring Boot backend service for searching and retrieving flight offers.  
It provides REST endpoints to search for flights, look up airport codes by name, and retrieve detailed flight information, including amenities, pricing, and layover data.

## Features

- **Flight Search**

  - Search by departure and arrival airport code, departure and return date, number of adults, currency (USD, MXN, EUR, etc.), and non-stop preference.
  - Validates dates (no past dates, return date must be after departure).

- **Dynamic Airport Lookup**

  - Find airport codes by partial or full name.

- **Flight Results**

  - Displays departure and arrival times, airport and airline names/codes, total duration (including layovers), stop details, and prices in the selected currency.
  - Sort results by price and/or duration.

- **Detailed Flight View**
  - Segment-by-segment breakdown including times, airlines, aircraft, flight numbers, operating carriers, cabin, class, and amenities.
  - Traveler fare details per segment.
  - Layover durations.
  - Complete price breakdown (base, total, fees, per traveler).

## Getting Started

### Prerequisites

- Java 21+
- Gradle
- (Optional) Docker

## Environment Variables

Before running, create a `.env` file in the `backend_flightsearch` directory with the following structure:

```
AMADEUS_API_BASE_URL=https://test.api.amadeus.com
AMADEUS_API_KEY=YOUR_API_KEY
AMADEUS_API_SECRET=YOUR_API_SECRET
```

This is required for accessing the Amadeus flight API.

## Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/LuisGutierrez15/Flight-Search
   cd Flight-Search/backend_flightsearch
   ```

2. Export environment variables from your `.env` file.

   On Linux/macOS:

   ```bash
   export $(cat .env | xargs)
   ```

   On Windows PowerShell:

   ```powershell
   $env:AMADEUS_API_BASE_URL="https://test.api.amadeus.com"
   $env:AMADEUS_API_KEY="YOUR_API_KEY"
   $env:AMADEUS_API_SECRET="YOUR_API_SECRET"
   ```

3. Build and run the application:

   ```bash
   ./gradlew bootRun
   ```

4. The API will be available at `http://localhost:8080`.

## Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t flight-search-backend .
   ```

2. Run the container:

   ```bash
   docker run -p 8080:8080 --env-file .env flight-search-backend
   ```

## Running Tests

1. Make sure your environment variables are exported as above.

2. Run backend tests using Gradle:

   ```bash
   ./gradlew test
   ```

## API Endpoints

- `GET /api/v1/flightsearch/search`  
  Search for flights with query parameters for airports, dates, adults, currency, and stops.

- `GET /api/v1/flightsearch/airports/{keyWord}`  
  Search for airports by name or partial name.

## Project Structure

- `src/main/java` - Java source code
- `src/main/resources` - Configuration files
- `build.gradle` - Build configuration
- `.env` - Environment variables

## Development

- Uses Java records for DTOs and domain models.
- Includes mapping and validation logic for all requirements.
- Easily extendable for additional features or integrations.
