import {
  POST_PROFILE_REQUEST,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
} from "./profileTypes";

import axios from "axios";

export const postProfileRequest = () => {
  return {
    type: POST_PROFILE_REQUEST,
  };
};

export const postProfileSuccess = (post) => {
  return {
    type: POST_PROFILE_SUCCESS,
    payload: post,
  };
};

export const postProfileFailure = (error) => {
  return {
    type: POST_PROFILE_FAILURE,
    payload: error,
  };
};

export const postProfile = (profile) => {
  // console.log(profile);
  const { name, phone, email, country, dateofbirth, avatarUrl } = profile;
  return (dispatch) => {
    // fetch("https://strapiapis.ew.r.appspot.com/profiles/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/x-www-form-urlencoded" }, // this line is important, if this content-type is not set it wont work
    //   body: JSON.stringify(profile),
    // })
    //   .then((response) => {
    //     const user = response.data;
    //     dispatch(postProfileSuccess(user));
    //   })
    //   .catch((error) => {
    //     const errormsg = error.message;
    //     dispatch(postProfileFailure(errormsg));
    //   });

    axios
      .post("https://strapi-resources.ew.r.appspot.com/profiles/", {
        name,
        country,
        email,
        phone,
        dateofbirth,
        avatarUrl,
      })
      .then((response) => {
        const user = response.data;
        dispatch(postProfileSuccess(user));
      })
      .catch((error) => {
        const errormsg = error.message;
        dispatch(postProfileFailure(errormsg));
      });
  };
};
