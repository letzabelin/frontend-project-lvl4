// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App.jsx';
import '../assets/application.scss';

export default (gon) => {
  const root = document.getElementById('chat');

  ReactDOM.render(
    <App />,
    root
  );
};
