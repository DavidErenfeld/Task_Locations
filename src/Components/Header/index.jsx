import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelector from "../CountrySelector";
import "./style.css";

const Header = ({ handleCountrySelect }) => {
  const navigate = useNavigate();

  const navigateToLocationChecker = () => {
    navigate("/location-checker");
  };

  return (
    <section className="header">
      <p className="logo">Starbucks locations</p>
      <nav>
        <div>
          <CountrySelector onSelect={handleCountrySelect} />
        </div>
        <button className="btn" onClick={navigateToLocationChecker}>
          Location Checker
        </button>
      </nav>
    </section>
  );
};

export default Header;
