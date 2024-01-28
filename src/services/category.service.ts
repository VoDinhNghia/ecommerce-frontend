import { IcreateCategory } from "../interfaces/category.interface";
import { IparamsFetchList } from "../interfaces/common.interface";
import {
  addService,
  deleteService,
  fetchService,
  updateService,
} from "./common.service";

export const createCategory = async (payload: IcreateCategory) => {
  const res = await addService("/api/categories", payload);
  return res;
};

export const updateCategory = async (id: string, payload: IcreateCategory) => {
  const res = await updateService(`/api/categories/${id}`, payload);
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await deleteService(`/api/categories/${id}`);
  return res;
};

export const getCategories = async (payload: IparamsFetchList) => {
  const res = await fetchService("/api/categories", payload, false);
  return res;
};
