// @ts-check

import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

import routes from '../routes.js';

const slice = createSlice({
  name: 'channels',
  initialState: [],
  reducers: {
    // addChannel: async (state, payload) => {

    // },
    // removeChannel: async (state, payload) => {

    // },
    // renameChannel: async (state, payload) => {

    // },
  },
});

export default slice.reducer;
