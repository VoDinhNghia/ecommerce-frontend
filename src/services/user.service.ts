import axios from "axios";
import { API_URL } from "../constants/constant";
import { setHeaderAxios } from "./auth.service";
import { IparamsFetchList } from "../interfaces/common.interface";
import {
  IpayloadAddUser,
  IpayloadUpdateProfile,
  IpayloadUpdateUser,
} from "../interfaces/user.interface";

export const getUserList = async (payload: IparamsFetchList) => {
  const res = await axios.get(`${API_URL}/api/users`, {
    params: payload,
    headers: setHeaderAxios(),
  });
  return res;
};

export const updateUser = async (id: string, payload: IpayloadUpdateUser) => {
  const res = await axios.put(
    `${API_URL}/api/users/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const updateProfile = async (
  id: string,
  payload: IpayloadUpdateProfile
) => {
  const res = await axios.put(
    `${API_URL}/api/users/profile/${id}`,
    payload,
    {
      headers: setHeaderAxios(),
    }
  );
  return res;
};

export const addUser = async (payload: IpayloadAddUser) => {
  const res = await axios.post(`${API_URL}/api/users`, payload, {
    headers: setHeaderAxios(),
  });
  return res;
};

export const deleteUser = async (id: string) => {
  const res = await axios.delete(`${API_URL}/api/users/${id}`, {
    headers: setHeaderAxios(),
  });
  return res;
};
