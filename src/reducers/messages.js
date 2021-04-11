// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.push(message);
    },
  },
});

const actions = { ...slice.actions };

export { actions };

export default slice.reducer;
