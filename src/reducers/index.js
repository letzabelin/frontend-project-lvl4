// @ts-check

import { combineReducers } from 'redux';

import currentChannelId from './currentChannelId.js';
import channels from './channels.js';
import messages from './messages.js';

export default combineReducers({
  currentChannelId,
  channels,
  messages,
});
