import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit';
import { selectCurrentChannelId } from '../channels/channelsSlice';
import type { IMessage } from '@/types/Chat';
import type { RootState } from '@/redux/store';

const messagesAdapter = createEntityAdapter<IMessage>();
const initialMessagesState = messagesAdapter.getInitialState();

interface MessagesInformation {
  messages: typeof initialMessagesState,
}

const initialMessagesInformationState: MessagesInformation = {
  messages: initialMessagesState,
};

const messagesSlice = createSlice({
  name: 'messagesInformation',

  initialState: initialMessagesInformationState,

  reducers: {
    setMessages: (state, { payload }) => {
      const rawMessages = payload as IMessage[];
      messagesAdapter.setAll(state.messages, rawMessages);
    },

    sendMessage: (state, { payload }) => {
      const message = payload as IMessage;
      messagesAdapter.upsertOne(state.messages, message);
    },
  },
});

export const { setMessages, sendMessage } = messagesSlice.actions;

const { selectAll: selectAllMessages } = messagesAdapter.getSelectors<RootState>((state) => state.messagesInformation.messages ?? initialMessagesState);

export const selectMessagesByChannelId = createSelector(
  [selectAllMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages.filter(({ channelId }) => channelId === currentChannelId),
);

export default messagesSlice.reducer;
