import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import type { FlightSearchCriteria } from "../types/FlightSearchCriteria";

export const fetchData = async (searchCriteria: FlightSearchCriteria) => {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    adults,
    currency,
    nonStop,
    sortByDuration,
    sortByPrice,
  } = searchCriteria;
  const params = {
    origin: origin?.split(":")[0],
    departureDate: departureDate
      ? (departureDate as string).split("T")[0]
      : undefined,
    returnDate: returnDate ? (returnDate as string).split("T")[0] : undefined,
    adults,
    destination: destination?.split(":")[0],
    currency: currency?.split(" ")[0],
    nonStop: nonStop,
    sortByDuration,
    sortByPrice,
  };
  try {
    const response = await axiosInstance.get("/search", { params });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};

export const getCurrencies = async () => {
  try {
    const response = await axiosInstance.get("/currencies");
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};
export const getAirports = async (query: string) => {
  try {
    const response = await axiosInstance.get(`/airports/${query}`);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
  }
};
