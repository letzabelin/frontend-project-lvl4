// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider } from '@rollbar/react';

import App from './App.jsx';
import store from '../store/index.js';
import i18n from '../localize.js';
import { WebSocketContext } from '../contexts/index.js';
import rollbarConfig from '../rollbar.js';

export default (socket) => {
  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <WebSocketContext.Provider value={{ socket }}>
            <App />
          </WebSocketContext.Provider>
        </Provider>
      </I18nextProvider>
    </RollbarProvider>
  );

  return vdom;
};
