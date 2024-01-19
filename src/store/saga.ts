import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import CategorySaga from "./categories/categories.saga";
import ProductSaga from "./products/products.saga";
import SlideImageAdvSaga from "./settings/settings.saga";

export default function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(CategorySaga),
    fork(ProductSaga),
    fork(SlideImageAdvSaga),
  ]);
}
