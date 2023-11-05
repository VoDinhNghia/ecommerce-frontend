/* eslint-disable @typescript-eslint/no-explicit-any */

import { IpropModalCommon } from "./common.interface";

export interface IpayloadUpdateUser {
  email?: string;
  role?: string;
  passWord?: string;
}

export interface IpayloadUpdateProfile {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  mobile?: string;
}

export interface Iprofile {
  lastName?: string;
  firstName?: string;
  middleName?: string;
  code?: string;
  gender?: string;
  mobile?: string;
}

export interface IpropUserMgt {
  dispatch?: any;
  listUsers?: any;
  totalUser?: any;
}

export interface IrowUserTable {
  _id?: string;
  index?: number;
  name?: string;
  email?: string;
  code?: string;
  role?: string;
}

export interface IpayloadAddUser {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  gender?: string;
  mobile?: string;
  passWord?: string;
  role?: string;
  email?: string;
}

export interface IpropModalUser extends IpropModalCommon {
  fetchUsers?: any;
  userInfo?: IrowUserTable;
}