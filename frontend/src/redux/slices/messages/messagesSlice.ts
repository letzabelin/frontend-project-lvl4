import { createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectCurrentChannelId, removeChannel } from '../channels/channelsSlice';
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
    setMessages: (state, { payload }: PayloadAction<{ messages: IMessage[] }>) => {
      messagesAdapter.setAll(state.messages, payload.messages);
    },

    addMessage: (state, { payload }: PayloadAction<{ message: IMessage }>) => {
      messagesAdapter.addOne(state.messages, payload.message);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, { payload }) => {
      const messagesIds = Object.values(state.messages.entities)
        .filter((message) => message?.channelId === payload.id)
        .flatMap((message) => message?.id ?? []);

      messagesAdapter.removeMany(state.messages, messagesIds);
    });
  },
});

export const { setMessages, addMessage } = messagesSlice.actions;

const { selectAll: selectAllMessages } = messagesAdapter.getSelectors<RootState>((state) => state.messagesInformation.messages ?? initialMessagesState);

export const selectMessagesByChannelId = createSelector(
  [selectAllMessages, selectCurrentChannelId],
  (messages, currentChannelId) => messages.filter(({ channelId }) => channelId === currentChannelId),
);

export default messagesSlice.reducer;
