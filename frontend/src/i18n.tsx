import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import english from "./translations/english/translation.json";
import spanish from "./translations/spanish/translation.json";
import baske from "./translations/basque/translation.json";

const resources = {
  en: {
    translation: english,
  },
  es: {
    translation: spanish,
  },
  eus: {
    translation: baske,
  },
};

i18next.use(initReactI18next).init({
  resources,
  lng: "en", //default language
});

export default i18next;
