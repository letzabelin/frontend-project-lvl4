// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

// import gon from 'gon';
import '../assets/application.scss';
import run from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

run();
