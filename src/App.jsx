import React, { useEffect } from "react";
import MapComponent from "./Components/MapComponent";
import CountrySelector from "./Components/CountrySelector";
import { filterStoresByCountry } from "./Utils/filterUtils";
import { useStore } from "./contexts/storeContext";
import { countryCodes } from "./Utils/codes";
import "./App.css";

const App = () => {
  const { state, dispatch } = useStore();

  const handleCountrySelect = async (countryCode) => {
    if (countryCode) {
      const iso3Code = countryCodes[countryCode] || countryCode; // המרה של הקוד מ-2 ל-3 אותיות
      console.log(`Selected country code (2 letters): ${countryCode}`);
      console.log(`Converted country code (3 letters): ${iso3Code}`);
      const filteredStores = await filterStoresByCountry(
        state.stores,
        iso3Code
      );
      dispatch({ type: "FILTER_STORES", payload: filteredStores });
    } else {
      dispatch({ type: "FILTER_STORES", payload: state.stores });
    }
  };

  return (
    <main className="main-page">
      <CountrySelector onSelect={handleCountrySelect} />
      <MapComponent stores={state.filteredStores} />
    </main>
  );
};

export default App;
