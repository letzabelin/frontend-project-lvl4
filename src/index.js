// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import gon from 'gon';
import run from './index.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

run(gon);
