// @ts-check

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from '../locales/en/translation.json';
import translationRu from '../locales/ru/translation.json';

const resources = {
  ru: {
    translation: translationRu,
  },
  en: {
    translation: translationEn,
  },
};

const options = {
  lng: 'ru',
  debug: true,
  resources,
  react: {
    useSuspense: true,
  },
};

i18n
  .use(initReactI18next)
  .init(options);

export default i18n;
