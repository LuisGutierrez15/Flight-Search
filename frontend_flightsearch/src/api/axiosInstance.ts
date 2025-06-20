import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api/v1/flightsearch",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
