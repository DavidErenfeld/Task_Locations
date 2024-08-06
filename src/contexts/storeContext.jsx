import React, { createContext, useReducer, useContext, useEffect } from "react";

const StoreContext = createContext();

const initialState = {
  stores: [],
  filteredStores: [],
  countries: [],
  loading: true,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_STORES":
      return {
        ...state,
        stores: action.payload,
        filteredStores: action.payload,
        loading: false,
      };
    case "SET_COUNTRIES":
      return { ...state, countries: action.payload };
    case "FILTER_STORES":
      return { ...state, filteredStores: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json"
    )
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_STORES", payload: data });
        dispatch({ type: "FILTER_STORES", payload: data });

        const uniqueCountries = Array.from(
          new Set(data.map((store) => store.country))
        ).map((countryCode) => {
          return {
            code: countryCode,
            name: countryCode,
          };
        });
        dispatch({ type: "SET_COUNTRIES", payload: uniqueCountries });
      })
      .catch((error) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Failed to load store locations: " + error.message,
        });
      });
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
