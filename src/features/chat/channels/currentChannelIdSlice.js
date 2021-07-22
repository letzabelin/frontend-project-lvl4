// @ts-check

import { createSlice } from '@reduxjs/toolkit';

import fetchAllData from '../../../store/fetchAllData.js';
import { channelsActions } from './channelsSlice.js';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: null,
  reducers: {
    setCurrentChannel: (_, { payload: { id } }) => id,
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllData.fulfilled,
      (_, { payload: { currentChannelId } }) => currentChannelId,
    );

    builder.addCase(channelsActions.addChannel, (_, { payload }) => payload.id);
    builder.addCase(channelsActions.deleteChannel, () => {
      const defaultChannelId = 1;
      return defaultChannelId;
    });
  },
});

export const currentChannelIdActions = slice.actions;

export default slice.reducer;
