import { useEffect, useState } from "react";
import type { Currency } from "../types/Currency";
import { getCurrencies } from "../api/FlightSearchService";

export const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCurrencies();
        const currencies = response;
        setCurrencies(currencies);
      } catch {
        console.log("Error fetching currencies");
      }
    };
    getData();
  }, []);
  return { currencies };
};
