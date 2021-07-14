// @ts-check

import React from 'react';
import { Provider } from 'react-redux';

import App from './App.jsx';
import store from '../store/index.js';

export default () => {
  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  return vdom;
};
