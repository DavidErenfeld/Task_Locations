import useCountryCodes from "../../Hooks/useCountryCodes";
import Header from "../../Header";
import { useStore } from "../../contexts/storeContext";
import { filterStoresByCountry } from "../../Utils/filterUtils";
import MapComponent from "../MapComponent";
import "./style.css";

const MainPage = () => {
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
      <Header handleCountrySelect={handleCountrySelect} />
      <MapComponent stores={state.filteredStores} />
    </main>
  );
};
export default MainPage;
