# Flight Search App

A fullstack application for searching, sorting, and viewing detailed information about flights.  
Built with a Java Spring Boot backend and a modern React + TypeScript frontend.

---

## Features

- **Flight Search:**
  - Search by departure/arrival airport code, date, number of adults, currency (USD, MXN, EUR ...), and non-stop preference.
  - Dynamic airport code lookup by name or partial name.
  - Date validation (no past dates, return date after departure).
- **Flight Results:**
  - List of flight options with initial/final times, airport and airline names/codes, total duration (including layovers), stops, and prices in selected currency.
  - Sort results by price and/or duration.
- **Flight Details:**
  - Segment-by-segment breakdown: times, airlines, aircraft, flight number, operating carrier, cabin, class, amenities (with chargeability), and layover times.
  - Traveler fare details per segment.
  - Price breakdown: base, total, fees, per traveler, all in selected currency.

---

## Project Structure

```
Flight-Search/
├── backend_flightsearch/   # Spring Boot backend
├── frontend_flightsearch/  # React + TypeScript frontend
```

---

## Getting Started

### Backend

1. **Navigate to backend:**
   ```bash
   cd backend_flightsearch
   ```
2. **Configure environment variables:**  
   Edit `.env` as needed for API keys, etc.
3. **Run the backend:**
   ```bash
   ./gradlew bootRun
   ```
   The backend will be available at `http://localhost:8080`.

### Frontend

1. **Navigate to frontend:**
   ```bash
   cd frontend_flightsearch
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the frontend:**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173` (or as shown in your terminal).

---

## Usage

- **Search for flights:**  
  Enter airport names (if partial match will suggest codes), select dates, number of adults, currency, and non-stop preference.
- **View results:**  
  Browse and sort flight options. Click on a flight to see detailed segment and pricing info.
- **Airport lookup:**  
  Start typing an airport name to dynamically load matching codes.

---

## Development

- **Backend:**
  - Java 21+, Spring Boot, Gradle
  - DTOs and mappers for clean API responses
  - Currency conversion and validation logic
- **Frontend:**
  - React, TypeScript, Vite
  - Modern UI components (Stepper, Carousel, etc.)
  - Redux for state management
  - API integration via Axios

---
