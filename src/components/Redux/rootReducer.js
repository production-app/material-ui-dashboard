import { combineReducers } from "redux";
import countriesReducer from "./Country/countriesReducer";
import profileReducer from "./Profile/profileReducer";
import imageReducer from "./Images/imageReducer";
import dataReducer from "./GetData/getDataReducer";

const rootReducer = combineReducers({
  country: countriesReducer,
  profile: profileReducer,
  image: imageReducer,
  data: dataReducer,
});

export default rootReducer;
