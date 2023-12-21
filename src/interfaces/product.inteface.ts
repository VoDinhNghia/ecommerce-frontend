import { Icategory } from "./category.interface";
import { IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateProduct {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: string;
}

export interface IcreateProductDetail {
  dateOfManufacture?: Date | string;
  country?: string;
  productId: string;
  color?: string;
  inputPower?: string;
  mainboard?: string;
  memory?: string;
  size?: string;
  warrantyExpiration?: string;
}

export interface IcreateProductImage {
  file: any;
  isAvatar: boolean | string;
  productId: string;
}

export interface IproductDetail extends IcreateProductDetail {
  id: string;
}

export interface Iproduct extends IcreateProduct {
  id?: string;
  category?: Icategory;
  detail?: IproductDetail;
  discounts?: any;
  images?: any;
  reviews?: any;
  rates?: any;
}
export interface IpropProductPage {
  dispatch?: any;
  listProducts?: Iproduct[];
  totalProduct?: number;
}

export interface ImodalProductPage extends IpropModalCommon {
  productInfo: Iproduct;
  fetchProducts: any;
  listCategories: Icategory[] | any;
}

export interface IpropProductDetail extends IpropModalCommon {
  productInfo: Iproduct;
  fetchProducts: any;
}

export interface IpropProductImage extends IpropModalCommon {
  dispatch?: any;
  productInfo: Iproduct;
  fetchProducts?: any;
}

export interface IproductImage {
  id?: string;
  url?: string;
}

export interface IcreateProductDiscount {
  discount: number;
  startDate: Date;
  endDate: Date;
  productId: string;
}