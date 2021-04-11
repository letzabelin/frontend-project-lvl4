// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentChannelId',
  initialState: '1',
  reducers: {
    changeCurrentChannelId: () => {},
  },
});

export default slice.reducer;
