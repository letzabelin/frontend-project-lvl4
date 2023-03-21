import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from './axiosBaseQuery';
import type { IUser } from '@/types/User';

const api = createApi({
  reducerPath: 'api',

  baseQuery: axiosBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: () => {
      const storagedUser: string | null = localStorage.getItem('user');
      const user: IUser = storagedUser ? JSON.parse(storagedUser) : null;

      return user?.token ? { Authorization: `Bearer ${user?.token}` } : {};
    },
  }),

  endpoints: () => ({}),
});

export default api;
