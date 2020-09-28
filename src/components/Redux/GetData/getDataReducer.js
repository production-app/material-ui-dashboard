import {
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
  GET_DATA_FAILURE,
} from "./getDataTypes";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA_REQUEST:
      return {
        ...state,
        loading: true,
        data: {},
      };
    case GET_DATA_SUCCESS:
      const data = action.payload;
      return {
        ...state,
        loading: false,
        data,
      };
    case GET_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default dataReducer;
