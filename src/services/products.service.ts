import axios from "axios";
import { API_URL } from "../constants/constant";
import { IcreateProduct, IcreateProductDetail } from "../interfaces/product.inteface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createProduct = async (payload: IcreateProduct) => {
  const res = await axios.post(`${API_URL}/api/products`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getProducts = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${API_URL}/api/products`, {
    params: payload,
  });
  return res;
};

export const updateProduct = async (id: string, payload: IcreateProduct) => {
  const res = await axios.put(`${API_URL}/api/products/${id}`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteProduct = async (id: string) => {
  const res = await axios.delete(`${API_URL}/api/products/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const createProductDetail = async (payload: IcreateProductDetail) => {
  const res = await axios.post(`${API_URL}/api/products/detail`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
}

export const updateProductDetail = async (id: string, payload: IcreateProductDetail) => {
  const res = await axios.put(`${API_URL}/api/products/deatail/${id}`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
}