import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import CategoryReducer from "./categories/categories.reducer";
import ProductReducer from "./products/products.reducer";

const rootReducer = combineReducers({
  UserReducer,
  CategoryReducer,
  ProductReducer,
});

export default rootReducer;
