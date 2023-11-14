import { takeLatest } from "redux-saga/effects";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} from "../../services/products.service";
import { productActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";

function* addProduct(params: IparamSaga) {
  yield addSagaCommon(createProduct, params, "Add product");
}

function* editProduct(params: IparamSaga) {
  yield updateSagaCommon(updateProduct, params, "Update product");
}

function* removeProduct(params: IparamSaga) {
  yield removeSagaCommon(deleteProduct, params, "Delete product");
}

function* fetchProducts(params: IparamSaga) {
  yield fetchListSagaCommon(
    getProducts,
    productActions.GET_LIST_PRODUCT_SUCCESS,
    "Get list products",
    params
  );
}

function* ProductSaga() {
  yield takeLatest<ItakeLatestSaga>(productActions.ADD_PRODUCT, addProduct);
  yield takeLatest<ItakeLatestSaga>(productActions.UPDATE_PRODUCT, editProduct);
  yield takeLatest<ItakeLatestSaga>(
    productActions.DELETE_PRODUCT,
    removeProduct
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.GET_LIST_PRODUCT,
    fetchProducts
  );
}

export default ProductSaga;
