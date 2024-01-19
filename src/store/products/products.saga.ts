import { takeLatest } from "redux-saga/effects";
import { productActions } from "../actions";
import { IparamSaga, ItakeLatestSaga } from "../../interfaces/common.interface";
import {
  addSagaCommon,
  fetchDetailSagaCommon,
  fetchListSagaCommon,
  removeSagaCommon,
  updateSagaCommon,
} from "../common";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  updateProductDetail,
  createProductDetail,
  createImage,
  deleteImage,
  createDiscount,
  updateDiscount,
  deleteDiscount,
  getProductDetail,
  createRate,
  createReview,
  updateReview,
  deleteReview,
} from "../../services/products.service";

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

function* addDiscount(params: IparamSaga) {
  yield addSagaCommon(createDiscount, params, "Add product discount");
}

function* editDiscount(params: IparamSaga) {
  yield updateSagaCommon(updateDiscount, params, "Update product discount");
}

function* removeDiscount(params: IparamSaga) {
  yield removeSagaCommon(deleteDiscount, params, "Delete product discount");
}

function* fetchProductDetail(params: IparamSaga) {
  yield fetchDetailSagaCommon(
    getProductDetail,
    params,
    productActions.GET_PRODUCT_DETAIL_SUCCESS,
    "Get product detail success"
  );
}

function* addRate(params: IparamSaga) {
  yield addSagaCommon(createRate, params, "Create product rate");
}

function* addReview(params: IparamSaga) {
  yield addSagaCommon(createReview, params, "Create product review");
}

function* editReview(params: IparamSaga) {
  yield updateSagaCommon(updateReview, params, "Update product review");
}

function* removeReview(params: IparamSaga) {
  yield removeSagaCommon(deleteReview, params, "Delete product review");
}

export default function* ProductSaga() {
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
  yield takeLatest<ItakeLatestSaga>(
    productActions.ADD_PRODUCT_DISCOUNT,
    addDiscount
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.UPDATE_PRODUCT_DISCOUNT,
    editDiscount
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.DELETE_PRODUCT_DISCOUNT,
    removeDiscount
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.GET_PRODUCT_DETAIL,
    fetchProductDetail
  );
  yield takeLatest<ItakeLatestSaga>(productActions.ADD_PRODUCT_RATE, addRate);
  yield takeLatest<ItakeLatestSaga>(
    productActions.ADD_PRODUCT_REVIEW,
    addReview
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.UPDATE_PRODUCT_REVIEW,
    editReview
  );
  yield takeLatest<ItakeLatestSaga>(
    productActions.DELETE_PRODUCT_REVIEW,
    removeReview
  );
}
