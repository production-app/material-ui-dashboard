import {
  POST_PROFILE_REQUEST,
  POST_PROFILE_SUCCESS,
  POST_PROFILE_FAILURE,
} from "./profileTypes";

const initialState = {
  loading: false,
  user: [],
  error: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        user: [],
      };
    case POST_PROFILE_SUCCESS:
      const user = state.user.concat(action.payload);
      return {
        ...state,
        loading: false,
        user,
      };
    case POST_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
