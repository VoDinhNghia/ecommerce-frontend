import { IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateCategory {
  name?: string;
  description?: string;
}

export interface Icategory {
  id?: string;
  name?: string;
  description?: string;
}

export interface IpropCategoryMgtPage {
  listCategories?: Icategory[];
  totalCategory?: number;
  dispatch?: any;
}

export interface ImodalCategory extends IpropModalCommon {
  fetchCategories?: any;
  categoryInfo?: Icategory;
}
