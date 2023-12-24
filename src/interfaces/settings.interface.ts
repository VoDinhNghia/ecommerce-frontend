import { IparamsFetchList, IpropModalCommon } from "./common.interface";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IcreateSlideImg {
  file?: any;
  description?: string;
  isActive?: boolean;
}

export interface IfetchSlideImg extends IparamsFetchList {
  isActive?: boolean;
}

export interface IslideImageAdv {
  id: string;
  path?: string;
  url?: string;
  originName?: string;
  isActive?: boolean;
  description?: string;
}

export interface IpropSlideImgAdvPage {
  dispatch?: any;
  listSlideImgAdv: IslideImageAdv[];
}

export interface IpropModalSlideImgAdv extends IpropModalCommon {
  listSlideImgAdv?: IslideImageAdv[];
  fetchSlideImg?: any;
  slideImageInfo?: IslideImageAdv | any;
}
