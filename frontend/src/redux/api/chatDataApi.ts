import api from '../api';
import { changeCurrentChannel, setChannels } from '../slices/channels/channelsSlice';
import { setMessages } from '../slices/messages/messagesSlice';
import type { IChannel, ICurrentChannelId, IMessage } from '@/types';

export const chatDataApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChatData: builder.query<
      {
        channels: IChannel[],
        messages: IMessage[],
        currentChannelId: ICurrentChannelId;
      },
      void
    >({
      query: () => ({
        url: '/data',
        method: 'get',
      }),

      onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
        const { data } = await queryFulfilled;

        dispatch(setChannels({ channels: data.channels }));
        dispatch(changeCurrentChannel({ id: data.currentChannelId }));
        dispatch(setMessages({ messages: data.messages }));
      },
    }),
  }),
});

export const { useGetChatDataQuery } = chatDataApi;
