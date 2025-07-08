# Flight Search Frontend

This is the frontend application for the Flight Search project.  
It provides a modern, user-friendly interface for searching, sorting, and viewing detailed information about flights.

## Features

- **Flight Search Form**

  - Search by airport name with dynamic code lookup, dates, number of adults, currency (USD, MXN, EUR), and non-stop preference.
  - Date pickers with validation (no past dates, return date must be after departure).

- **Flight Results List**

  - Displays flight options with departure and arrival times, airport and airline names/codes, total duration (including layovers), stops, and prices in the selected currency.
  - Supports sorting by price and/or duration.

- **Flight Details View**

  - Shows segment details including times, airlines, aircraft, flight number, operating carrier, cabin, class, amenities (with chargeability), and layover durations.
  - Traveler fare details per segment.
  - Price breakdown including base, total, fees, and per traveler amounts in the selected currency.

- **Responsive Design**
  - Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm

## Installation

1. Navigate to the frontend directory:

   ```bash
   cd frontend_flightsearch
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

## Configuration

The frontend expects the backend API to be available at `http://localhost:8080` by default.

You can change this by creating an environment file (depending on your mode) in `frontend_flightsearch/`, such as:

```
.env.development
.env.production
```

with the contents:

```
VITE_BACKEND_URL=http://localhost:8080
```

When using Docker Compose, this typically points to:

```
VITE_BACKEND_URL=http://backend:8080
```

## Running Tests

To execute frontend tests:

```
npm run test
```

## Project Structure

```
frontend_flightsearch/
├── src/
│   ├── components/    # React components (forms, inputs, buttons, etc.)
│   ├── api/           # API service calls (e.g., Axios)
│   ├── store/         # State management (Redux Toolkit)
│   ├── utils/         # Utility functions (formatters, validation, etc.)
│   └── App.tsx
├── public/
├── package.json
└── vite.config.ts
```

## Development Notes

- Built with React, TypeScript, and Vite for a modern, fast development experience.
- Uses UI component libraries for building responsive forms, tables, and date pickers.
- Global state managed via Redux Toolkit, with API integration handled by Axios.
