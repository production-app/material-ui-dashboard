import {
  IMAGE_PROFILE_REQUEST,
  IMAGE_PROFILE_SUCCESS,
  IMAGE_PROFILE_FAILURE,
} from "./imageTypes";

export const imageProfileRequest = () => {
  return {
    type: IMAGE_PROFILE_REQUEST,
  };
};

export const imageProfileSuccess = (image) => {
  return {
    type: IMAGE_PROFILE_SUCCESS,
    payload: image,
  };
};

export const imageProfileFailure = (error) => {
  return {
    type: IMAGE_PROFILE_FAILURE,
    payload: error,
  };
};
