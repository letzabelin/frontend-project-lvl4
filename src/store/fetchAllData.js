import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export default createAsyncThunk('api/v1/data', async ({ headers }) => {
  const { data } = await axios.get('api/v1/data', { headers });
  return data;
});
