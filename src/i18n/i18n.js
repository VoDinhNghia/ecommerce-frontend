import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import English from "./eng.json";
import VietNamese from "./vn.json";

const resources = {
  eng: {
    translation: English,
  },
  vie: {
    translation: VietNamese,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "eng",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
