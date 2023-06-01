import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
