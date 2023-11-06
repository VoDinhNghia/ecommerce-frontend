import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import CategoryReducer from "./categories/categories.reducer";

const rootReducer = combineReducers({
  UserReducer,
  CategoryReducer,
});

export default rootReducer;
