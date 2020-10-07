import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./GetUserTypes";

import axios from "axios";

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (counts) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: counts,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const fetchUsers = () => {
  return (dispatch) => {
    axios
      .get("https://strapi-resources.herokuapp.com/profiles/count/")
      .then((response) => {
        const counts = response.data;
        dispatch(fetchUsersSuccess(counts));
      })
      .catch((error) => {
        const errormsg = error.message;
        dispatch(fetchUsersFailure(errormsg));
      });
  };
};
