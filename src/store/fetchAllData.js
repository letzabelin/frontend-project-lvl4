// @ts-check

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from '../api/routes.js';

export default createAsyncThunk('api/v1/data', async ({ headers }) => {
  const { data } = await axios.get(routes.dataPath(), { headers });
  return data;
});
