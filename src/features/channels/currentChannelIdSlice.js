import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: 0,
  reducers: {
    initCurrentChannelId: (_, { payload: { currentChannelId } }) => currentChannelId,
  },
});

export const { actions } = slice;

export default slice.reducer;
