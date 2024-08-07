import React from "react";
import MapComponent from "./Components/MapComponent";
import CountrySelector from "./Components/CountrySelector";
import { filterStoresByCountry } from "./Utils/filterUtils";
import { useStore } from "./contexts/storeContext";
import "./App.css";
import useCountryCodes from "./Hooks/useCountryCodes";

const App = () => {
  const { state, dispatch } = useStore();
  const countryMap = useCountryCodes();

  const handleCountrySelect = async (countryCode) => {
    if (countryCode) {
      const iso3Code = countryMap[countryCode]?.code3 || countryCode;
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
