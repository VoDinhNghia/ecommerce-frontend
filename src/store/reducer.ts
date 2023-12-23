import { combineReducers } from "redux";
import UserReducer from "./users/reducer.user";
import CategoryReducer from "./categories/categories.reducer";
import ProductReducer from "./products/products.reducer";
import SlideImgAdvReducer from "./settings/settings.reducer";

const rootReducer = combineReducers({
  UserReducer,
  CategoryReducer,
  ProductReducer,
  SlideImgAdvReducer,
});

export default rootReducer;
