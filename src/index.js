// @ts-check

import React from 'react';
import { render } from 'react-dom';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import App from './App.jsx';
import '../assets/application.scss';

import gon from 'gon';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const root = document.getElementById('chat');

render(
  <App />,
  root
);
