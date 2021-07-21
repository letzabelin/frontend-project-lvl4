// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import App from './App.jsx';
import store from '../store/index.js';
import i18n from '../localize.js';
import { WebSocketContext } from '../contexts/index.js';

export default (socket) => {
  const rollbarConfig = {
    accessToken: 'e1c85303844e4100a23de2fe89a4f65c',
    captureUncaught: true,
    captureUnhandledRejections: true,
    // payload: {
    //     environment: "production"
    // }
  };

  const vdom = (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <WebSocketContext.Provider value={{ socket }}>
              <App />
            </WebSocketContext.Provider>
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );

  return vdom;
};
