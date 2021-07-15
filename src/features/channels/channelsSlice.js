import { createSlice } from '@reduxjs/toolkit';

import fetchAllData from '../../store/fetchAllData.js';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchAllData.fulfilled]: (_, { payload: { channels } }) => channels,
  },
});

export const { actions } = slice;

export default slice.reducer;
