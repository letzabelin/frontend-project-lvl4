import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from '../features/chat/channels/channelsSlice.js';
import messagesReducer from '../features/chat/messages/messagesSlice.js';
import currentChannelIdReducer from '../features/chat/channels/currentChannelIdSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    currentChannelId: currentChannelIdReducer,
  },
});

export default store;
