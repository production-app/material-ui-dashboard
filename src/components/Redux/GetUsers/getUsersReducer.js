import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "./GetUserTypes";

const initialState = {
  loading: false,
  count: 0,
  error: "",
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        count: 0,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        count: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        count: action.payload,
      };

    default:
      return state;
  }
};

export default usersReducer;
