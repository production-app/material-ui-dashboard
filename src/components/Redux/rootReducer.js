import { combineReducers } from "redux";
import countriesReducer from "./Country/countriesReducer";
import profileReducer from "./Profile/profileReducer";
import imageReducer from "./Images/imageReducer";
import dataReducer from "./GetData/getDataReducer";
import countReducer from "./GetUsers/getUsersReducer";

const rootReducer = combineReducers({
  country: countriesReducer,
  profile: profileReducer,
  image: imageReducer,
  count: countReducer,
  data: dataReducer,
});

export default rootReducer;
