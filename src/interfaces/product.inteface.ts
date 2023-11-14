import { Icategory } from "./category.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateProduct {
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  categoryId?: string;
}

export interface Iproduct extends IcreateProduct {
  id?: string;
  category?: Icategory;
  detail?: any;
  discounts?: any;
  images?: any;
  reviews?: any;
  rate?: any;
}
export interface IpropProductPage {
  dispatch?: any;
  listProducts?: Iproduct[];
  totalProduct?: number;
}
