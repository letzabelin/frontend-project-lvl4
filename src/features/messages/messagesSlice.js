import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    initMessages: (_, { payload: { messages } }) => messages,
  },
});

export const { actions } = slice;

export default slice.reducer;
