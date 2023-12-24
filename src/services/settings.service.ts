import axios from "axios";
import { API_URL } from "../constants/constant";
import { setHeaderAxios, setMultipartHeader } from "./auth.service";
import {
  IcreateSlideImg,
  IfetchSlideImg,
} from "../interfaces/settings.interface";

export const createSlideImg = async (payload: IcreateSlideImg) => {
  const res = await axios.post(`${API_URL}/api/slide-image`, payload, {
    headers: setMultipartHeader(),
  });
  return res;
};

export const getAllSlideImg = async (payload: IfetchSlideImg) => {
  const res = await axios.get(`${API_URL}/api/slide-image`, {
    params: payload,
  });
  return res;
};

export const deleteSlideImg = async (id: string) => {
  const res = await axios.delete(`${API_URL}/api/slide-image/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};
