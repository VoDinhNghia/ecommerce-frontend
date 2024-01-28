import { IparamsFetchList } from "../interfaces/common.interface";
import {
  IpayloadAddUser,
  IpayloadUpdateProfile,
  IpayloadUpdateUser,
} from "../interfaces/user.interface";
import {
  addService,
  deleteService,
  fetchService,
  updateService,
} from "./common.service";

export const getUserList = async (payload: IparamsFetchList) => {
  const res = await fetchService("/api/users", payload, true);
  return res;
};

export const updateUser = async (id: string, payload: IpayloadUpdateUser) => {
  const res = await updateService(`/api/users/${id}`, payload);
  return res;
};

export const updateProfile = async (
  id: string,
  payload: IpayloadUpdateProfile
) => {
  const res = await updateService(`/api/users/profile/${id}`, payload);
  return res;
};

export const addUser = async (payload: IpayloadAddUser) => {
  const res = await addService("/api/users", payload);
  return res;
};

export const deleteUser = async (id: string) => {
  const res = await deleteService(`/api/users/${id}`);
  return res;
};
