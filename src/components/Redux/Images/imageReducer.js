import {
  IMAGE_PROFILE_REQUEST,
  IMAGE_PROFILE_SUCCESS,
  IMAGE_PROFILE_FAILURE,
} from "./imageTypes";

const initialState = {
  loading: false,
  image: "",
  error: "",
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        image: "",
      };
    case IMAGE_PROFILE_SUCCESS:
      const image = action.payload;
      return {
        ...state,
        loading: false,
        image,
      };
    case IMAGE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        image: action.payload,
      };

    default:
      return state;
  }
};

export default imageReducer;
