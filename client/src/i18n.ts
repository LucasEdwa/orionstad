import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";
import enFooter from "./locales/en/footer.json";
import enNavbar from "./locales/en/navbar.json";
import enServices from "./locales/en/services.json";

import svHome from "./locales/sv/home.json";
import svAbout from "./locales/sv/about.json";
import svContact from "./locales/sv/contact.json";
import svFooter from "./locales/sv/footer.json";
import svNavbar from "./locales/sv/navbar.json";
import svServices from "./locales/sv/services.json";
import enCommon from "./locales/en/common.json";
import svCommon from "./locales/sv/common.json";

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("language");
    if (saved === "sv" || saved === "en") return saved;
  }
  return "sv";
};

const resources = {
  en: {
    home: enHome,
    about: enAbout,
    contact: enContact,
    footer: enFooter,
    navbar: enNavbar,
    services: enServices,
    common: enCommon,
  },
  sv: {
    home: svHome,
    about: svAbout,
    contact: svContact,
    footer: svFooter,
    navbar: svNavbar,
    services: svServices,
    common: svCommon,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "sv",
    ns: ["home", "about", "contact", "footer", "navbar", "services", "common"],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
