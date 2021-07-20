// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App.jsx';
import store from '../store/index.js';
import i18n from '../localize.js';

export default () => {
  const vdom = (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  );

  return vdom;
};
