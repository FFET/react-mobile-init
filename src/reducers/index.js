/**
 * Reducer
 */
import { combineReducers } from "redux";

// import demoReducer from "./demoReducer";
import demoReducer from "@page/Home/reducer";
import loginReducer from "@page/Login/reducer";

const rootReducer = combineReducers({
  demoReducer,
  loginReducer,
});

export default rootReducer;
