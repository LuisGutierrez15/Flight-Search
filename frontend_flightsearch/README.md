# Flight Search Frontend

This is the frontend application for the Flight Search project. It provides a modern, user-friendly interface for searching, sorting, and viewing detailed information about flights.

## Features

- **Flight Search Form**
  - Search by airport name (with dynamic code lookup), dates, number of adults, currency (USD, MXN, EUR), and non-stop preference.
  - Date pickers with validation (no past dates, return date after departure).
- **Flight Results List**
  - Displays each flight option with departure/arrival times, airport and airline names/codes, total duration (including layovers), stops, and prices in the selected currency.
  - Sorting by price and/or duration.
- **Flight Details View**
  - Shows all segment details: times, airlines, aircraft, flight number, operating carrier, cabin, class, amenities (with chargeability), and layover times.
  - Traveler fare details per segment.
  - Price breakdown: base, total, fees, per traveler, all in selected currency.
- **Responsive Design**
  - Works well on desktop and mobile devices.

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm

### Installation

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

4. Open your browser at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### Configuration

- The frontend expects the backend API to be running at `http://localhost:8080` by default.
- You can change the API base URL in your environment or configuration files as needed. (.env file by mode e.g . development, production)

## Project Structure

```
frontend_flightsearch/
├── src/
│   ├── components/      # React components (forms, inputs, buttons, etc.)
│   ├── api/             # API service calls (e.g., Axios)
│   ├── store/           # State management (Redux)
│   ├── utils/           # Utility functions (formatters, validation, etc)
│   └── App.tsx
├── public/
├── package.json
└── vite.config.ts
```

## Development Notes

- Built with React, TypeScript, and Vite for fast development.
- Uses modern UI libraries for forms, tables, and date pickers.
- State management via Redux Toolkit.
