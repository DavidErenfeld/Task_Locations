import { useState, useEffect } from "react";

const useCountryCodes = () => {
  const [countryMap, setCountryMap] = useState({});

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const countries = await response.json();

        const map = {};
        countries.forEach((country) => {
          const code2 = country.cca2;
          const code3 = country.cca3;
          const name = country.name.common;
          map[code2] = { code3, name };
        });

        console.log("Country Map:", map);
        setCountryMap(map);
      } catch (error) {
        console.error("Failed to fetch country codes:", error);
      }
    };

    fetchCountryCodes();
  }, []);

  return countryMap;
};

export default useCountryCodes;
