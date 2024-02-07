import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageEn from "./locale/en.json";
import LanguageAr from "./locale/ar.json";
const resources = {
  en: {
    translation: LanguageEn,
  },
  ar: {
    translation: LanguageAr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
