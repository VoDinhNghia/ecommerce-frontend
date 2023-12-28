/* eslint-disable @typescript-eslint/ban-types */

import { Icategory } from "./category.interface";
import { Iproduct } from "./product.inteface";
import { IslideImageAdv } from "./settings.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IeventOnchangeInput {
  target: {
    value: string;
  };
}

export type IeventOnchangeSelect = any;

export interface IparamsFetchList {
  searchKey?: string;
  page?: number;
  limit?: number;
}

export interface IactionRedux {
  type: string;
  payload: any;
}

export interface IparamSaga {
  payload: any;
  id: string;
}

export interface IresponseAxios {
  data: {
    statusCode: number;
    data: any;
    message: string;
  };
}

export type IreturnTypeSaga = any;
export type ItakeLatestSaga = any;

export interface IuserReducer {
  listUsers?: object[] | string | number | boolean | any;
  totalUser?: number;
  dispatch?: any;
}

export interface IstateRedux {
  UserReducer: IuserReducer;
  CategoryReducer: {
    listCategories: Icategory[];
    totalCategory: number;
  };
  ProductReducer: {
    listProducts: Iproduct[];
    totalProduct: number;
    productDetail: Iproduct;
  };
  SlideImgAdvReducer: {
    listSlideImgAdv: IslideImageAdv[];
    totalSlideImgAdv: number;
  };
}

export interface IpropsNavToggle {
  expand: boolean;
  setExpand: Function;
}

export interface IpropAddAndSearchTable {
  dispatch?: any;
  title?: string;
  onSearch?: Function | any;
  onShowAdd?: Function | any;
  titleSearch?: string;
  disableSearch?: boolean;
  disableBtnAdd?: boolean;
}

export interface IpropModalCommon {
  dispatch?: any;
  isShowModal?: boolean | any;
  onCloseModal?: Function | any;
  type?: string;
}

export type IeventOnchangeFile = any;

export interface IpropReadMore {
  children?: any;
  isReadMore?: boolean | any;
  setReadMore?: Function | any;
  lengthSlice?: number;
}

export type IallStateReadMore = any;

export interface IheaderTableCommon {
  headerList: {
    id: string;
    label: string;
    minWidth?: number;
  }[];
}

export interface IpaginationTableCommon {
  page: number;
  limit: number;
  total: number;
  setState: any;
  fetchList: any;
  state: any;
}

export interface IpropActionTableCommon {
  state: any;
  setState: any;
  rowData?: any;
  disableBtnUpdate?: any;
}

export interface ImodalCommon extends IpropModalCommon {
  onDelete?: any;
  nameTitle?: string;
  content?: any;
  onFilter?: any;
  isShowButtonUpdate?: boolean | any;
  onUpdate?: any;
  size?: string | any;
}

export interface IpropTextFieldForm {
  field: string;
  defaultValue?: string | number | boolean;
  register: any;
  errors: any;
  type?: string;
  rows?: number;
}

export interface IpropSelectReactForm {
  field: string;
  defaultValue?: string | any;
  errors: any;
  control: any;
  options: any;
}

export interface IpropSelectMuiForm {
  field?: string;
  defaultValue?: string | any;
  errors?: any;
  control?: any;
  options: any;
  register?: any;
  type?: string;
  onChangeSelect?: any;
}

export interface ImodalBootstrapCommon extends IpropModalCommon {
  onAdd?: any;
  onUpdate?: any;
  onDelete?: any;
  body: any;
  nameTitle: string;
  size?: string | any;
}

export interface IpropTitleHeader {
  title: string;
}

export interface Ioptions {
  label?: string;
  value?: string;
}

export interface IpropCheckBoxMui {
  label: string | any;
  field: string | any;
  control: any;
  defaultValue?: string | any;
  errors?: any;
}

export type IcheckBoxEvent = any;
export type IchangeFileEvent = any;
export type IformDataType = any;

export interface IpropFooterPage {
  t?: any;
}