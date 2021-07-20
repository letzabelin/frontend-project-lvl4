// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import App from './App.jsx';
import store from '../store/index.js';
import i18n from '../localize.js';
import { WebSocketContext } from '../contexts/index.js';

export default (socket) => {
  const vdom = (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <WebSocketContext.Provider value={{ socket }}>
          <App />
        </WebSocketContext.Provider>
      </Provider>
    </I18nextProvider>
  );

  return vdom;
};
