import { io } from 'socket.io-client';
import { IChatEvent } from '@/types';
import api from '../api';
import { addMessage } from '../slices/messages/messagesSlice';
import { addChannel } from '../slices/channels/channelsSlice';
import type { IMessage, IChannel } from '@/types';

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
            dispatch(addMessage(message));
          });
        });

        socket.on(IChatEvent.NewChannel, (channel: IChannel) => {
          updateCachedData(() => {
            dispatch(addChannel(channel));
          });
        });

        await cacheEntryRemoved;
      },
    }),

    sendMessage: builder.mutation<IMessage, Omit<IMessage, 'id'>>({
      queryFn: (data) => (
        new Promise((resolve) => {
          socket.emit(IChatEvent.NewMessage, data, (message: IMessage) => {
            resolve({ data: message });
          });
        })
      ),
    }),

    addChannel: builder.mutation<IChannel, Omit<IChannel, 'id' | 'removable'>>({
      queryFn: (data) => (
        new Promise((resolve) => {
          socket.emit(IChatEvent.NewChannel, data, (channel: IChannel) => {
            resolve({ data: channel });
          });
        })
      ),
    }),
  }),
});

export const { useGetWebsocketMessagesQuery, useSendMessageMutation, useAddChannelMutation } = chatWebsocketApi;