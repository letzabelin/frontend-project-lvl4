import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { createEntityAdapter, createSelector, EntityState } from '@reduxjs/toolkit';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import type { IUser } from '@/types/User';
import type { IChannel, ICurrentChannelId, IMessage, IServerChatsResponse } from '@/types/Chat';
import { IRootState } from '@/app/store';

const channelsAdapter = createEntityAdapter<IChannel>();
const messagesAdapter = createEntityAdapter<IMessage>();

const initialChannelsState = channelsAdapter.getInitialState();
const initialMessagesAdapter = messagesAdapter.getInitialState();

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
    getChatData: builder.query<{
      channels: EntityState<IChannel>;
      messages: EntityState<IMessage>;
      currentChannelId: ICurrentChannelId;
    }, void>({
      query: () => ({
        url: '/data',
        method: 'get',
      }),
      transformResponse: ({ channels, messages, currentChannelId }: IServerChatsResponse) => ({
        currentChannelId,
        channels: channelsAdapter.setAll(initialChannelsState, channels),
        messages: messagesAdapter.setAll(initialMessagesAdapter, messages),
      }),
    }),
  }),
});

const selectChatDataResult = apiSlice.endpoints.getChatData.select();

export const selectChannelsData = createSelector(
  selectChatDataResult,
  ({ data }) => data?.channels,
);

export const selectCurrentChannelId = createSelector(
  selectChatDataResult,
  ({ data }) => data?.currentChannelId,
);

export const selectMessagesData = createSelector(
  selectChatDataResult,
  ({ data }) => data?.messages,
);

export const selectCurrentChannel = createSelector(
  [selectChannelsData, selectCurrentChannelId],
  (channels, currentChannelId) => {
    if (!currentChannelId || !channels?.entities) {
      return null;
    }

    return channels.entities[currentChannelId];
  },
);

export const selectMessagesByChannelId = createSelector(
  [selectMessagesData, selectCurrentChannelId],
  (messages, currentChannelId) => {
    if (!currentChannelId || !messages?.entities) {
      return [];
    }

    return messages.ids
      .filter((id) => id === currentChannelId)
      .flatMap((id) => messages.entities[id] ?? []);
  },
);

export const {
  selectAll: selectAllChannels,
} = channelsAdapter.getSelectors((state: IRootState) => selectChannelsData(state) ?? initialChannelsState);

export const { useGetChatDataQuery } = apiSlice;
