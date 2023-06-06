import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index.js';

const initI18n = () => {
  const i18nInst = i18n.createInstance();
  i18nInst
    .use(initReactI18next)
    .init({
      fallbackLng: 'ru',
      debug: false,
      resources,
      interpolation: {
        escapeValue: false,
      },
    });
  return i18nInst;
};

export default initI18n;
