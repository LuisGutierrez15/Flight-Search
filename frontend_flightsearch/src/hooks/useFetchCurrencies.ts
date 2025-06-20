import { useEffect, useState } from "react";
import type { Currency } from "../types/Currency";
import { getCurrencies } from "../api/FlightSearchService";

export const useFetchCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getCurrencies();
        const currencies: Currency[] = [
          {
            code: "MXN 🇲🇽",
            displayName: "Mexican Peso",
          },
          {
            code: "USD 🇺🇸",
            displayName: "United States Dollar",
          },
          {
            code: "EUR 🇪🇺",
            displayName: "Euro",
          },
        ];
        const currenciesResponse = response;
        setCurrencies(currencies || currenciesResponse);
      } catch {
        console.log("Error fetching currencies");
      }
    };
    getData();
  }, []);
  return { currencies };
};
