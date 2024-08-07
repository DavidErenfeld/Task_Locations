import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LocationChecker from "./Components/LocationChecker";
import "./App.css";
import MainPage from "./Components/MainPage";

const App = () => {
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
