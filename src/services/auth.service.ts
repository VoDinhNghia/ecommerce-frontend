/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "../constants/constant";
import {
  IpayLoadLogin,
  IuserInfo,
} from "../interfaces/login.interface";

const userItem = "user";

export const setUserInfoToSessionStorage = (user: IuserInfo) => {
  sessionStorage.setItem(userItem, JSON.stringify(user));
};

export const getCurrentUser = () => {
  const user = sessionStorage.getItem(userItem);
  return user ? JSON.parse(user) : {};
};

export const setHeaderAxios = () => {
  const currentUser = getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    "Content-Type": "application/json",
  };
  return headers;
};

export const setMultipartHeader = () => {
  const currentUser = getCurrentUser();
  const headers = {
    Authorization: `Bearer ${currentUser?.accessToken}`,
    "Content-Type": "multipart/form-data",
  };
  return headers;
};

export const login = async (payload: IpayLoadLogin | any) => {
  try {
    const res = await axios.post(`${API_URL}/api/auth/login`, payload);
    setUserInfoToSessionStorage(res?.data?.data);
    return res?.data;
  } catch (error: any) {
    return {
      message: error?.response?.data?.message,
    };
  }
};

export const logOut = () => {
  sessionStorage.clear();
}
