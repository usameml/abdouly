import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Login": "Login",
      "Logout": "Logout",
      "About": "About",
      "Company Name": "Company Name",
      "About Our Company": "About Our Company",
      "Follow Us": "Follow Us",
      "Our Team": "Our Team"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language set to English
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
