import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import CategorySaga from "./categories/categories.saga";
import ProductSaga from "./products/products.saga";

function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(CategorySaga),
    fork(ProductSaga),
  ]);
}

export default rootSaga;
