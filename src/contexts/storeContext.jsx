import React, { createContext, useReducer, useContext, useEffect } from "react";

const StoreContext = createContext();

const initialState = {
  stores: [],
  filteredStores: [],
  countries: [],
  loading: true,
  error: null,
};

const actionTypes = {
  SET_STORES: "SET_STORES",
  SET_COUNTRIES: "SET_COUNTRIES",
  FILTER_STORES: "FILTER_STORES",
  SET_ERROR: "SET_ERROR",
  START_LOADING: "START_LOADING",
  FINISH_LOADING: "FINISH_LOADING",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_STORES:
      return {
        ...state,
        stores: action.payload,
        filteredStores: action.payload,
        loading: false,
      };
    case actionTypes.SET_COUNTRIES:
      return { ...state, countries: action.payload };
    case actionTypes.FILTER_STORES:
      return { ...state, filteredStores: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case actionTypes.START_LOADING:
      return { ...state, loading: true };
    case actionTypes.FINISH_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchStores = async () => {
      dispatch({ type: actionTypes.START_LOADING });
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/mmcloughlin/starbucks/master/locations.json"
        );
        const data = await response.json();
        dispatch({ type: actionTypes.SET_STORES, payload: data });
        dispatch({ type: actionTypes.FILTER_STORES, payload: data });

        const uniqueCountries = Array.from(
          new Set(data.map((store) => store.country))
        ).map((countryCode) => ({
          code: countryCode,
          name: countryCode,
        }));
        dispatch({ type: actionTypes.SET_COUNTRIES, payload: uniqueCountries });
      } catch (error) {
        dispatch({
          type: actionTypes.SET_ERROR,
          payload: "Failed to load store locations: " + error.message,
        });
      } finally {
        dispatch({ type: actionTypes.FINISH_LOADING });
      }
    };

    fetchStores();
  }, []);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
