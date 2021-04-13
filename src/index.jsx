// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import faker from 'faker';
import Cookie from 'js-cookie';

import App from './App.jsx';
import '../assets/application.scss';
import reducer from './reducers/index.js';
import UserContext from './context/index.js';
import './localize.js';

export default (gon) => {
  const root = document.getElementById('chat');
  const { channels, currentChannelId, messages } = gon;
  const preloadedState = {
    channels, currentChannelId, messages,
  };

  const username = faker.name.findName();

  if (!Cookie.get('username')) {
    Cookie.set('username', username);
  }

  const store = configureStore({
    reducer,
    preloadedState,
  });

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={Cookie.get('username')}>
        <App />
      </UserContext.Provider>
    </Provider>,
    root,
  );
};
