import { createSlice } from '@reduxjs/toolkit';

import fetchAllData from '../../store/fetchAllData.js';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: 0,
  reducers: {},
  extraReducers: {
    [fetchAllData.fulfilled]: (_, { payload: { currentChannelId } }) => currentChannelId,
  },
});

export const { actions } = slice;

export default slice.reducer;
