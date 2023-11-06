import { takeLatest } from "redux-saga/effects";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} from "../../services/category.service";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import { categoryActions } from "../actions";

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

function* CategorySaga() {
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

export default CategorySaga;
