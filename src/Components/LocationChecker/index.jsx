import { useState } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./style.css";

function LocationChecker() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const checkLocation = async () => {
    try {
      const response = await fetch(
        "https://geo-location-service-b0911ef2477e.herokuapp.com/check-location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            countryCode: countryCode,
          }),
        }
      );

      const data = await response.json();
      if (data.inside) {
        setMessage("The location is inside the country.");
      } else {
        setMessage("The location is not inside the country.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to check the location.");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <section className="location-checker-section">
      <div className="close-icon" onClick={handleClose}>
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <h1 className="title">Check Location Inside Country</h1>
      <div className="input-container">
        <input
          className="input"
          type="text"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          placeholder="Enter latitude"
        />
        <input
          className="input"
          type="text"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          placeholder="Enter longitude"
        />
        <input
          className="input"
          type="text"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          placeholder="Enter country code (3 letters)"
        />
      </div>
      <button className="btn" onClick={checkLocation}>
        Check Location
      </button>
      <p className="message">{message}</p>
    </section>
  );
}

export default LocationChecker;
