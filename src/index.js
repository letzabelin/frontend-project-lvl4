// @ts-check

import ReactDOM from 'react-dom';

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';

import '../assets/application.scss';
import './localize.js';

import init from './app/init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.getElementById('chat');
const socket = io();
const app = init(socket);

ReactDOM.render(app, container);
