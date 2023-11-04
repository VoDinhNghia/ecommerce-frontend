export const routes = {
  dashboard: "/dashboard",
  login: "/login",
  home: "/home",
  userMgt: "/user-mgt",
  settings: "/settings",
  register: "/register",
  aboutUs: "/about-us",
  cartDetail: "/cart-detail",
  category: "/category-mgt",
  product: "/product-mgt",
  slideAdv: "/slide-adv-mgt",
  blogs: "/blogs",
  blogAdmin: "/blogs-mgt",
  settingPage: "/settings-page",
  orderUser: "/user-order-mgt",
  orderAdmin: "/order-mgt",
  aboutUsMgt: "/about-us-mgt",
  contactQuestion: "/contact-question",
  contactAdmin: "/contact-question-mgt"
};

export const API_URL = process.env.REACT_APP_API_URL;

export const userRoles = {
  SUPPER_ADMIN: "SUPPER_ADMIN",
  USER: "USER",
};

export const moduleNames = {
  USER_MANAGEMENT: "Users Management",
  SETTINGS: "Settings",
  HOME_PAGE: "Home Page",
};

export const moduleOptions = [
  {
    value: "Users Management",
    label: "Users Management",
  },
  {
    value: "Settings",
    label: "Settings",
  },
];

export const selectMuiTypes = {
  USE_FORM: "USE_FORM",
  NORMAL: "NORMAL",
};

export const modalTypes = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  UPDATE_PROFILE: "UPDATE_PROFILE",
  DELETE: "DELETE",
  VIEW: "VIEW",
  IMPORT: "IMPORT",
  FILTER: "FILTER",
  OPTIONS: "OPTIONS",
};

export const userGenderOptions = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

export const formatDateTime = "YYYY-MM-DD Hm:mm:ss";
export const formatDate = "YYYY-MM-DD";

export const inputTypes = {
  TEXT: "text",
  TEXT_AREA: "textarea",
  NUMBER: "number",
  EMAIL: "email",
  PASSWORD: "password",
  DATE: "date",
};

export const optionLanguage = [
  {
    label: "English",
    value: "eng",
  }, 
  {
    label: "VietNamese",
    value: "vie",
  },
]
