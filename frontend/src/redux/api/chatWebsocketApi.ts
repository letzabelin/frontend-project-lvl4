import { io } from 'socket.io-client';
import { IChatEvent } from '@/types/Chat';
import api from '../api';
import { sendMessage } from '../slices/messages/messagesSlice';
import type { IMessage } from '@/types/Chat';

const socket = io({
  withCredentials: true,
});

const isWebsocketConnected = new Promise((resolve) => {
  socket.on('connect', () => {
    resolve(true);
  });
});

export const chatWebsocketApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWebsocketMessages: builder.query({
      queryFn: () => ({ data: [] }),

      onCacheEntryAdded: async (_, { cacheDataLoaded, updateCachedData, cacheEntryRemoved, dispatch }) => {
        await cacheDataLoaded;

        await isWebsocketConnected;

        socket.on(IChatEvent.NewMessage, (message: IMessage) => {
          updateCachedData(() => {
            dispatch(sendMessage(message));
          });
        });

        await cacheEntryRemoved;
      },
    }),

    sendMessage: builder.mutation<IMessage, Omit<IMessage, 'id'>>({
      queryFn: (data) =>
        new Promise((resolve) => {
          socket.emit(IChatEvent.NewMessage, data, (message: IMessage) => {
            resolve({ data: message });
          });
        }),
    }),
  }),
});

export const { useGetWebsocketMessagesQuery, useSendMessageMutation } = chatWebsocketApi;
