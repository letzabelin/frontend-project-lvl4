import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectCurrentChannelId } from '../channels/channelsSlice';
import type { IMessage } from '@/types';
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
    setMessages: (state, { payload }: PayloadAction<IMessage[]>) => {
      messagesAdapter.setAll(state.messages, payload);
    },

    addMessage: (state, { payload }: PayloadAction<IMessage>) => {
      messagesAdapter.addOne(state.messages, payload);
    },
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

const { selectAll: selectAllMessages } = messagesAdapter.getSelectors<RootState>((state) => state.messagesInformation.messages ?? initialMessagesState);

export const selectMessagesByChannelId = createSelector(
  [selectAllMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages.filter(({ channelId }) => channelId === currentChannelId),
);

export default messagesSlice.reducer;
