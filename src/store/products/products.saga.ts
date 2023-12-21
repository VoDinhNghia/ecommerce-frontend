import { takeLatest } from "redux-saga/effects";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateProductDetail,
  createProductDetail,
  createImage,
  deleteImage,
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

function* addProductDetail(params: IparamSaga) {
  yield addSagaCommon(createProductDetail, params, "Add product detail");
}

function* editProductDetail(params: IparamSaga) {
  yield updateSagaCommon(updateProductDetail, params, "Update product detail");
}

function* uploadImage(params: IparamSaga) {
  yield addSagaCommon(createImage, params, "Upload product image");
}

function* removeImage(params: IparamSaga) {
  yield removeSagaCommon(deleteImage, params, "Delete product image");
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
  yield takeLatest<ItakeLatestSaga>(
    productActions.ADD_PRODUCT_DETAIL,
    addProductDetail
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.UPDATE_PRODUCT_DETAIL,
    editProductDetail
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.UPLOAD_PRODUCT_IMAGE,
    uploadImage
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.DELETE_PRODUCT_IMAGE,
    removeImage
  );
}

export default ProductSaga;
