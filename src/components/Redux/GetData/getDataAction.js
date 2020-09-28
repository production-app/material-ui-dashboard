import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
} from "./getDataTypes";

export const getDataRequest = () => {
  return {
    type: GET_DATA_REQUEST,
  };
};

export const getDataSuccess = (data) => {
  return {
    type: GET_DATA_SUCCESS,
    payload: data,
  };
};

export const getDataFailure = (error) => {
  return {
    type: GET_DATA_FAILURE,
    payload: error,
  };
};
