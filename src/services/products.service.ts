import {
  IcreateProduct,
  IcreateProductDetail,
  IcreateProductDiscount,
  IcreateProductImage,
  IcreateProductRate,
  IcreateProductReview,
} from "../interfaces/product.inteface";
import { IparamsFetchList } from "../interfaces/common.interface";
import {
  addMultiPartService,
  addService,
  deleteService,
  fetchService,
  updateService,
} from "./common.service";

export const createProduct = async (payload: IcreateProduct) => {
  const res = await addService("/api/products", payload);
  return res;
};

export const getProducts = async (payload: IparamsFetchList) => {
  const res = await fetchService("/api/products", payload, false);
  return res;
};

export const updateProduct = async (id: string, payload: IcreateProduct) => {
  const res = await updateService(`/api/products/${id}`, payload);
  return res;
};

export const deleteProduct = async (id: string) => {
  const res = await deleteService(`/api/products/${id}`);
  return res;
};

export const createProductDetail = async (payload: IcreateProductDetail) => {
  const res = await addService("/api/products/detail", payload);
  return res;
};

export const updateProductDetail = async (
  id: string,
  payload: IcreateProductDetail
) => {
  const res = await updateService(`/api/products/deatail/${id}`, payload);
  return res;
};

export const createImage = async (payload: IcreateProductImage) => {
  const res = await addMultiPartService("/api/products/images", payload);
  return res;
};

export const deleteImage = async (id: string) => {
  const res = await deleteService(`/api/products/images/${id}`);
  return res;
};

export const createDiscount = async (payload: IcreateProductDiscount) => {
  const res = await addService("/api/products/discount", payload);
  return res;
};

export const updateDiscount = async (
  id: string,
  payload: IcreateProductDiscount
) => {
  const res = await updateService(`/api/products/discount/${id}`, payload);
  return res;
};

export const deleteDiscount = async (id: string) => {
  const res = await deleteService(`/api/products/discount/${id}`);
  return res;
};

export const getProductDetail = async (id: string) => {
  const res = await fetchService(`/api/products/${id}`, {}, false);
  return res;
};

export const createRate = async (payload: IcreateProductRate) => {
  const res = await addService("/api/products/rate", payload);
  return res;
};

export const createReview = async (payload: IcreateProductReview) => {
  const res = await addService("/api/products/review", payload);
  return res;
};

export const updateReview = async (
  id: string,
  payload: IcreateProductReview
) => {
  const res = await updateService(`/api/products/review/${id}`, payload);
  return res;
};

export const deleteReview = async (id: string) => {
  const res = await deleteService(`/api/products/review/${id}`);
  return res;
};
