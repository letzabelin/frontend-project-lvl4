import { createSlice } from '@reduxjs/toolkit';

import fetchAllData from '../../store/fetchAllData.js';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {},
  extraReducers: {
    [fetchAllData.fulfilled]: (_, { payload: { messages } }) => messages,
  },
});

export const { actions } = slice;

export default slice.reducer;
