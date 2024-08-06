import { useStore } from "../../contexts/storeContext";
import "./style.css";

const CountrySelector = ({ onSelect }) => {
  const { state } = useStore();

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
        {state.countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CountrySelector;
