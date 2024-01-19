import { takeLatest } from "redux-saga/effects";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import { categoryActions } from "../actions";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../../services/category.service";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* fetchListCategories(params: IparamSaga) {
  yield fetchListSagaCommon(
    getCategories,
    categoryActions.GET_LIST_CATEGORY_SUCCESS,
    "Get list categories",
    params
  );
}

function* editCategory(params: IparamSaga) {
  yield updateSagaCommon(updateCategory, params, "Update category");
}

function* addNewCategory(params: IparamSaga) {
  yield addSagaCommon(createCategory, params, "Add category");
}

function* removeCategory(params: IparamSaga) {
  yield removeSagaCommon(deleteCategory, params, "Delete category");
}

export default function* CategorySaga() {
  yield takeLatest<ItakeLatestSaga>(
    categoryActions.GET_LIST_CATEGORY,
    fetchListCategories
  );
  yield takeLatest<ItakeLatestSaga>(
    categoryActions.UPDATE_CATEGORY,
    editCategory
  );
  yield takeLatest<ItakeLatestSaga>(
    categoryActions.ADD_CATEGORY,
    addNewCategory
  );
  yield takeLatest<ItakeLatestSaga>(
    categoryActions.DELETE_CATEGORY,
    removeCategory
  );
}
