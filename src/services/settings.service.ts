import {
  IcreateSlideImg,
  IfetchSlideImg,
} from "../interfaces/settings.interface";
import {
  addMultiPartService,
  deleteService,
  fetchService,
  updateService,
} from "./common.service";

export const createSlideImg = async (payload: IcreateSlideImg) => {
  const res = await addMultiPartService("/api/slide-image", payload);
  return res;
};

export const updateSlideImg = async (id: string, payload: IcreateSlideImg) => {
  const res = await updateService(`/api/slide-image/${id}`, payload);
  return res;
};

export const getAllSlideImg = async (payload: IfetchSlideImg) => {
  const res = await fetchService("/api/slide-image", payload, false);
  return res;
};

export const deleteSlideImg = async (id: string) => {
  const res = await deleteService(`/api/slide-image/${id}`);
  return res;
};
