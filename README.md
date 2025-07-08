# Flight Search App

A fullstack application for searching, sorting, and viewing detailed information about flights.  
Built with a Java Spring Boot backend and a modern React + TypeScript frontend.

## Features

- **Flight Search**

  - Search by departure/arrival airport code, date, number of adults, currency (USD, MXN, EUR, etc.), and non-stop preference.
  - Dynamic airport code lookup by name or partial match.
  - Validates dates (no past dates, return date after departure).

- **Flight Results**

  - Shows flight options with departure/arrival times, airports, airlines, total duration (including layovers), stops, and price in selected currency.
  - Sort by price and/or duration.

- **Flight Details**
  - Segment-by-segment breakdown with times, airlines, aircraft, flight numbers, operating carriers, cabin, class, amenities (and charges), and layover details.
  - Traveler fare details per segment.
  - Full price breakdown (base, total, fees, per traveler) in selected currency.

## Project Structure

```
Flight-Search/
├── backend_flightsearch/   # Java Spring Boot backend
├── frontend_flightsearch/  # React + TypeScript frontend
└── compose.yaml
```

## Environment Variables

### Backend `.env`

Located in `backend_flightsearch/.env`.  
Required to configure Amadeus API access:

```
AMADEUS_API_BASE_URL=https://test.api.amadeus.com
AMADEUS_API_KEY=YOUR_API_KEY
AMADEUS_API_SECRET=YOUR_API_SECRET
```

### Frontend `.env.production` or `.env.development`

Located in `frontend_flightsearch/`.  
Used to point the frontend to the backend service:

```
VITE_BACKEND_URL=http://backend:8080
```

When running locally without Docker, typically use:

```
VITE_BACKEND_URL=http://localhost:8080
```

## Running with Docker

The recommended way to start the project is via Docker Compose.

> **NOTE:** Please make sure that .env file for backend and .env.production for frontend are already created

```
docker compose up --build
```

This will:

- Build and start the backend service at `http://localhost:8080`.
- Build and start the frontend service at `http://localhost:4173`.
- Connect both services on a shared Docker network.

## Running without Docker

### Backend (Spring Boot)

1. Navigate to the backend directory:

   ```bash
   cd backend_flightsearch
   ```

2. Export your environment variables from `.env`:

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

3. Start the backend:

   ```bash
   ./gradlew bootRun
   ```

The backend will be available at `http://localhost:8080`.

### Frontend (React + Vite)

1. Navigate to the frontend directory:

   ```bash
   cd frontend_flightsearch
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend:

   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` (or as shown in your terminal).

## Running Tests

### Frontend tests

```
cd frontend_flightsearch
npm run test
```

### Backend tests

1. Navigate to the backend directory:

   ```bash
   cd backend_flightsearch
   ```

2. Ensure environment variables are exported (as above).

3. Run backend tests:

   ```bash
   ./gradlew test
   ```

## Tech Stack

- **Backend:** Java 21+, Spring Boot, Gradle. Uses DTOs and mappers for structured API responses, with built-in currency conversion and validation.
- **Frontend:** React, TypeScript, Vite. Implements a modern UI, Redux for state management, and Axios for API communication.

## Summary of Useful Commands

| Task                        | Command                     |
| --------------------------- | --------------------------- |
| Run with Docker             | `docker compose up --build` |
| Run backend without Docker  | `./gradlew bootRun`         |
| Run frontend without Docker | `npm run dev`               |
| Run backend tests           | `./gradlew test`            |
| Run frontend tests          | `npm run test`              |

## Notes

- Ensure `.env` files are created in both the backend and frontend directories before starting the application.
- Docker Compose manages networking automatically. The frontend accesses the backend via `http://backend:8080`.
- Without Docker, adjust `VITE_BACKEND_URL` to point to `http://localhost:8080` in your environment file.
