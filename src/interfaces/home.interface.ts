/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icategory } from "./category.interface";

export interface IpropHomePage {
  dispatch: any;
  listCategories: Icategory[];
}

export interface IpropCategoryHomePage {
  listCategories: Icategory[];
}

export interface IpropProductHomePage {
  listCategories: Icategory[];
}