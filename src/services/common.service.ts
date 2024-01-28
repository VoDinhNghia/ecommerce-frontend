import axios from "axios";
import { API_URL } from "../constants/constant";
import { setHeaderAxios, setMultipartHeader } from "./auth.service";

export const addMultiPartService = async (path: string, body: any) => {
  const res = await axios.post(`${API_URL}${path}`, body, {
    headers: setMultipartHeader(),
  });
  return res;
};
export const addService = async (path: string, body: any) => {
  const res = await axios.post(`${API_URL}${path}`, body, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateService = async (path: string, body: any) => {
  const res = await axios.put(`${API_URL}${path}`, body, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteService = async (path: string) => {
  const res = await axios.delete(`${API_URL}${path}`, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const fetchService = async (
  path: string,
  params = {},
  isAuth = false
) => {
  let header: any = {};
  if (Object.keys(params).length > 0) {
    header = { ...header, params };
  }
  if (isAuth) {
    header = { ...header, headers: setHeaderAxios() };
  }
  const res = await axios.get(`${API_URL}${path}`, header);
  return res;
};
