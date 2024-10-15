import { useStore } from "../../contexts/storeContext";
import React, { useEffect, useState } from "react";
import "./style.css";
import useCountryCodes from "../../Hooks/useCountryCodes";

const CountrySelector = ({ onSelect }) => {
  const { state } = useStore();
  const countryMap = useCountryCodes();
  const [countryNames, setCountryNames] = useState([]);

  useEffect(() => {
    if (Object.keys(countryMap).length > 0) {
      const names = state.countries.map((country) => ({
        code: country.code,
        name: countryMap[country.code]?.name || `Unknown code: ${country.code}`,
      }));
      setCountryNames(names);
    }
  }, [state.countries, countryMap]);

  return (
    <div className="selector-section">
      <label htmlFor="country" className="visually-hidden">
        Select Country
      </label>
      <select
        id="country"
        className="form-select"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">All Countries</option>
        {countryNames.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
