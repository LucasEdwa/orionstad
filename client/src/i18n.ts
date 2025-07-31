import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enHome from "./locales/en/home.json";
import enAbout from "./locales/en/about.json";
import enContact from "./locales/en/contact.json";
import enFooter from "./locales/en/footer.json";
import enNavbar from "./locales/en/navbar.json";
import enServices from "./locales/en/services.json";

import esHome from "./locales/es/home.json";
import esAbout from "./locales/es/about.json";
import esContact from "./locales/es/contact.json";
import esFooter from "./locales/es/footer.json";
import esNavbar from "./locales/es/navbar.json";
import esServices from "./locales/es/services.json";
import svHome from "./locales/sv/home.json";
import svAbout from "./locales/sv/about.json";
import svContact from "./locales/sv/contact.json";
import svFooter from "./locales/sv/footer.json";
import svNavbar from "./locales/sv/navbar.json";
import svServices from "./locales/sv/services.json"; 

// TODO: Import es and sv translations when available

const getInitialLanguage = () => {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("language");
    if (saved === "en" || saved === "es" || saved === "sv") return saved;
  }
  return "en";
};

const resources = {
  en: {
    home: enHome,
    about: enAbout,
    contact: enContact,
    footer: enFooter,
    navbar: enNavbar,
    services: enServices,
  },
  es: {
    home: esHome,
    about: esAbout,
    contact: esContact,
    footer: esFooter,
    navbar: esNavbar,
    services: esServices,
  },
  sv: {
    home: svHome,
    about: svAbout,
    contact: svContact,
    footer: svFooter,
    navbar: svNavbar,
    services: svServices,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getInitialLanguage(),
    fallbackLng: "en",
    ns: ["home", "about", "contact", "footer", "navbar", "services"],
    defaultNS: "home",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
