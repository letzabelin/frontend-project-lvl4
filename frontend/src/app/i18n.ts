import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruTranslation from '@/assets/locales/ru/translation.json';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    lng: 'ru',

    resources: {
      ru: {
        translation: ruTranslation,
      },
    },
  });

export default i18n;
