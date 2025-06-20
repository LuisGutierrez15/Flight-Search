# Flight Search Backend

This is a Spring Boot backend service for searching and displaying flight offers. It provides endpoints to search for flights, retrieve airport codes by name, and display detailed flight information, including amenities, pricing, and layover details.

## Features

- Search for flights by:
  - Departure and arrival airport code
  - Departure and return date
  - Number of adults
  - Currency (USD, MXN, EUR ...)
  - Non-stop or with stops
- Dynamic airport code lookup by name or partial name
- Date validation (no past dates, return date after departure)
- List flight options with:
  - Initial departure and final arrival date/time
  - Airport and airline names and codes
  - Total flight duration (including layovers)
  - Stop details (name, code, layover time)
  - Total and per-traveler price in selected currency
- Sort results by price and/or duration
- Flight details view with:
  - Segment-by-segment breakdown (times, airlines, aircraft, etc.)
  - Traveler fare details per segment (cabin, class, amenities)
  - Layover times
  - Price breakdown (base, total, fees, per traveler)
- All prices shown in the selected currency

## Getting Started

### Prerequisites

- Java 21+
- Gradle
- (Optional) Docker

### Running Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/LuisGutierrez15/Flight-Search
   cd Flight-Search/backend_flightsearch
   ```

2. Configure environment variables in `.env` for API keys and secrets

3. Build and run the application:

   ```bash
   ./gradlew bootRun
   ```

4. The API will be available at `http://localhost:8080`.

### Running with Docker

1. Build the Docker image:

   ```bash
   docker build -t flight-search-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:8080 --env-file .env flight-search-backend
   ```

## API Endpoints

- `GET /api/v1/flightsearch/search`  
  Search for flights with query parameters for airports, dates, adults, currency, and stops.

- `GET /api/v1/flightsearch/airports/{keyWord}`  
  Search for airports by name or partial name.

---

## Project Structure

- `src/main/java` - Java source code
- `src/main/resources` - Configuration files
- `build.gradle` - Build configuration
- `.env` - Environment variables

---

## Development

- Uses Java records for DTOs and domain models
- Mapping and validation logic included for all requirements
- Easily extendable for new features or integrations

---
