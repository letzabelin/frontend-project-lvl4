import { createSlice, current } from '@reduxjs/toolkit';

import fetchAllData from '../../../store/fetchAllData.js';
import adapter from '../../../store/adapter.js';
import { channelsActions } from '../channels/channelsSlice.js';

const slice = createSlice({
  name: 'messages',
  initialState: adapter.getInitialState(),
  reducers: {
    addMessage: adapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllData.fulfilled,
      (state, { payload: { messages } }) => {
        adapter.setAll(state, messages);
      },
    );

    builder.addCase(channelsActions.deleteChannel, (state, { payload }) => {
      const messagesIds = Object.values(current(state.entities)).reduce(
        (acc, { channelId, id }) => (channelId === payload.id ? [...acc, id] : acc),
        [],
      );

      adapter.removeMany(state, messagesIds);
    });
  },
});

export const messagesSelectors = adapter.getSelectors(
  (state) => state.messages,
);

export const messagesActions = slice.actions;

export default slice.reducer;
