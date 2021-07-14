import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    initChannels: (_, { payload: { channels } }) => channels,
  },
  // extraReducers: {
  //   [fetchData.fulfilled]: (state, { payload: { channels } }) => {
  //     state.push(...channels);
  //   },
  // },
});

export const { actions } = slice;

export default slice.reducer;
