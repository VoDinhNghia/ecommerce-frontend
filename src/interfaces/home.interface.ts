/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icategory } from "./category.interface";
import { IpropModalCommon } from "./common.interface";
import { Iproduct } from "./product.inteface";
import { IslideImageAdv } from "./settings.interface";

export interface IpropHomePage {
  dispatch: any;
  listCategories: Icategory[];
}

export interface IpropCategoryHomePage {
  listCategories: Icategory[];
  state?: any;
  setState?: any;
  t?: any;
}

export interface IpropProductHomePage {
  dispatch?: any;
  category: any;
  listProducts?: Iproduct[];
  fetchCart?: any;
  t?: any;
}

export interface IpropSlideImgAdv {
  dispatch?: any;
  listSlideImgAdv: IslideImageAdv[];
}

export interface IpropProductDetailHomePage extends IpropModalCommon {
  dispatch?: any;
  productDetail?: Iproduct;
  productId?: string;
  addToCart?: any;
}

export interface IpropProductDetailImageAndInfo {
  productDetail?: Iproduct;
  addToCart?: any;
}

export interface IpropProductDetailComponent {
  productDetail?: Iproduct;
  fetchProductDetail?: any;
  dispatch?: any;
}