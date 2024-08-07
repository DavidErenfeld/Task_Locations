import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationChecker from "./Components/LocationChecker";
import { filterStoresByCountry } from "./Utils/filterUtils";
import { useStore } from "./contexts/storeContext";
import useCountryCodes from "./Hooks/useCountryCodes";
import "./App.css";
import MainPage from "./Components/MainPage";

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
    <Router>
      <Routes>
        <Route path="/location-checker" element={<LocationChecker />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
