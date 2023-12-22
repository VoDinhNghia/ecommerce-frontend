/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icategory } from "./category.interface";
import { Iproduct } from "./product.inteface";

export interface IpropHomePage {
  dispatch: any;
  listCategories: Icategory[];
}

export interface IpropCategoryHomePage {
  listCategories: Icategory[];
  state?: any;
  setState?: any;
}

export interface IpropProductHomePage {
  dispatch?: any;
  category: any;
  listProducts?: Iproduct[];
  fetchCart?: any;
}