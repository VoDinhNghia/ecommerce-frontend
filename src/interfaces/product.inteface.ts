import { Icategory } from "./category.interface";
import { IpropModalCommon } from "./common.interface";
import { IuserInfo } from "./login.interface";

export interface IcreateProduct {
  name?: string;
  description?: string;
  price?: number | any;
  quantity?: number | any;
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

export interface IcreateProductReview {
  content?: string;
  productId?: string;
}

export interface IcreateProductRate {
  rate?: number;
  productId?: string;
}

export interface IproductRate extends IcreateProductRate {
  id?: string;
  userId?: string;
  user?: IuserInfo;
}

export interface IproductReview extends IcreateProductReview {
  id?: string;
  createdAt?: Date;
  userId?: string;
  user?: IuserInfo;
}

export interface IproductDetail extends IcreateProductDetail {
  id: string;
}

export interface Iproduct extends IcreateProduct {
  id?: string;
  category?: Icategory;
  detail?: IproductDetail;
  discounts?: IproductDiscount[] | any;
  images?: IproductImage[] | any;
  reviews?: IproductReview[] | any;
  rates?: IproductRate[] | any;
}
export interface IpropProductPage {
  dispatch?: any;
  listProducts?: Iproduct[];
  totalProduct?: number;
  listCategories?: Icategory[] | any;
}

export interface ImodalProductPage extends IpropModalCommon {
  productInfo: Iproduct;
  fetchProducts: any;
  categories?: Icategory[] | any;
}

export interface IpropProductDetail extends IpropModalCommon {
  productInfo: Iproduct;
  fetchProducts: any;
}

export interface IpropProductImage extends IpropModalCommon {
  dispatch?: any;
  productInfo: Iproduct;
  fetchProducts?: any;
  productDetail?: Iproduct;
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

export interface IproductDiscount extends IcreateProductDiscount {
  id: string;
}

export interface IpropProductDiscount extends IpropModalCommon {
  dispatch?: any;
  productInfo: Iproduct;
  fetchProducts?: any;
  productDetail?: Iproduct;
}

export interface IpropActionDiscount extends IpropModalCommon {
  dispatch?: any;
  fetchProducts?: any;
  discountInfo?: IproductDiscount | any;
}

export interface IpropModalProductReview extends IpropModalCommon {
  dispatch?: any;
  fetchProducts?: any;
  productInfo: Iproduct;
  productDetail: Iproduct;
}

export interface IpropModalActionReview extends IpropModalCommon {
  dispatch?: any;
  fetchProductDetail?: any;
  reviewInfo: IproductReview;
}