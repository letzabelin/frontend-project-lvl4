import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import type { IUser } from '@/types/User';
import type { IServerChatsResponse } from '@/types/Chat';

const axiosBaseQuery = ({
  baseUrl,
  prepareHeaders,
}: {
  baseUrl: string,
  prepareHeaders: () => Record<string, string | undefined>
} = { baseUrl: '', prepareHeaders: () => ({}) }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > => async ({ url, method, data, params }) => {
  try {
    const result = await axios({
      method,
      data,
      params,
      url: baseUrl + url,
      headers: prepareHeaders(),
    });

    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;

    return {
      error: {
        status: err.response?.status,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const apiSlice = createApi({
  reducerPath: 'api',

  baseQuery: axiosBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: () => {
      const storagedUser: string | null = localStorage.getItem('user');
      const user: IUser = storagedUser ? JSON.parse(storagedUser) : null;

      return user?.token ? { Authorization: `Bearer ${user?.token}` } : {};
    },
  }),

  endpoints: (builder) => ({
    getChatData: builder.query<IServerChatsResponse, void>({
      query: () => ({
        url: '/data',
        method: 'get',
      }),
    }),
  }),
});

export const { useGetChatDataQuery } = apiSlice;
