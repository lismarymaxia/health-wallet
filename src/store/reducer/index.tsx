import { combineReducers } from "redux";
import reducerAuth from "./auth";
import reducerFuncionalidad from "./funcionalidad";
export default combineReducers({
  reducerAuth,
  reducerFuncionalidad,
});
