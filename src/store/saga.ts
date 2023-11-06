import { all, fork } from "redux-saga/effects";
import UserSaga from "./users/saga.user";
import CategorySaga from "./categories/categories.saga";

function* rootSaga() {
  yield all([
    fork(UserSaga),
    fork(CategorySaga),
  ]);
}

export default rootSaga;
