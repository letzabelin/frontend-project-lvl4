import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import { actions as channelsActions } from '../features/channels/channelsSlice.js';
import { actions as currentChannelIdActions } from '../features/channels/currentChannelIdSlice.js';
import { actions as messagesActions } from '../features/messages/messagesSlice.js';

export default () => {
  const dispatch = useDispatch();
  const { initMessages } = messagesActions;
  const { initChannels } = channelsActions;
  const { initCurrentChannelId } = currentChannelIdActions;

  return createAsyncThunk('api/v1/data', async ({ headers }) => {
    const { data } = await axios.get('api/v1/data', { headers });
    const { messages, channels, currentChannelId } = data;

    dispatch(initChannels({ channels }));
    dispatch(initMessages({ messages }));
    dispatch(initCurrentChannelId({ currentChannelId }));
  });
};
