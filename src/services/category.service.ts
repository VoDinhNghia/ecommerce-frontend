import axios from "axios";
import { API_URL } from "../constants/constant";
import { IcreateCategory } from "../interfaces/category.interface";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";

export const createCategory = async (payload: IcreateCategory) => {
  const res = await axios.post(`${API_URL}/api/categories`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateCategory = async (id: string, payload: IcreateCategory) => {
  const res = await axios.put(`${API_URL}/api/categories/${id}`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await axios.delete(`${API_URL}/api/categories/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const getCategories = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${API_URL}/api/categories`, {
    params: payload,
  });
  return res;
};
