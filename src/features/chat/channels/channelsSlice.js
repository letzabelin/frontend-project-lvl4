import { createSlice } from '@reduxjs/toolkit';

import fetchAllData from '../../../store/fetchAllData.js';
import adapter from '../../../store/adapter.js';

const slice = createSlice({
  name: 'channels',
  initialState: adapter.getInitialState(),
  reducers: {
    addChannel: adapter.addOne,
    renameChannel: (state, { payload }) => {
      adapter.upsertOne(state, payload);
    },
    deleteChannel: (state, { payload: { id } }) => {
      adapter.removeOne(state, id);
    },
  },
  extraReducers: {
    [fetchAllData.fulfilled]: (state, { payload: { channels } }) => {
      adapter.setAll(state, channels);
    },
  },
});

export const channelsSelectors = adapter.getSelectors((state) => state.channels);

export const channelsActions = slice.actions;

export default slice.reducer;
