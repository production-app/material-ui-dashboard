import {
  FETCH_COUNTRIES_REQUEST,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
} from "./CountriesTypes";

import axios from "axios";

export const fetchCountriesRequest = () => {
  return {
    type: FETCH_COUNTRIES_REQUEST,
  };
};

export const fetchCountriesSuccess = (countries) => {
  return {
    type: FETCH_COUNTRIES_SUCCESS,
    payload: countries,
  };
};

export const fetchCountriesFailure = (error) => {
  return {
    type: FETCH_COUNTRIES_FAILURE,
    payload: error,
  };
};

export const fetchCountries = () => {
  return (dispatch) => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        const countries = response.data;
        dispatch(fetchCountriesSuccess(countries));
      })
      .catch((error) => {
        const errormsg = error.message;
        dispatch(fetchCountriesFailure(errormsg));
      });
  };
};
