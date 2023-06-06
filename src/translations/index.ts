import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translateEn from './locales/en.json';
import translateVi from './locales/vi.json';

const resources = {
  en: { translation: translateEn },
  vi: { translation: translateVi }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: true
  }
});

i18n.changeLanguage('en');

export default i18n;
