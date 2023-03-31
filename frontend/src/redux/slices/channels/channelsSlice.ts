import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import type { IChannel, ICurrentChannelId } from '@/types';

const channelsAdapter = createEntityAdapter<IChannel>();
const initialChannelsState = channelsAdapter.getInitialState();

interface ChannelsInformation {
  currentChannelId: ICurrentChannelId | null;
  channels: typeof initialChannelsState;
}

const initialChannelsInformationState: ChannelsInformation = {
  currentChannelId: null,
  channels: initialChannelsState,
};

const channelsSlice = createSlice({
  name: 'channelsInformation',

  initialState: initialChannelsInformationState,

  reducers: {
    setChannels: (state, { payload }: PayloadAction<{ channels: IChannel[]}>) => {
      channelsAdapter.setAll(state.channels, payload.channels);
    },

    addChannel: (state, { payload }: PayloadAction<{ channel: IChannel }>) => {
      channelsAdapter.addOne(state.channels, payload.channel);
      // eslint-disable-next-line
      state.currentChannelId = payload.channel.id;
    },

    removeChannel: (state, { payload }: PayloadAction<Pick<IChannel, 'id'>>) => {
      const defaultChannelId = 1;

      channelsAdapter.removeOne(state.channels, payload.id);

      if (state.currentChannelId === payload.id) {
        // eslint-disable-next-line
        state.currentChannelId = defaultChannelId;
      }
    },

    renameChannel: (state, { payload }: PayloadAction<Pick<IChannel, 'id' | 'name'>>) => {
      channelsAdapter.updateOne(state.channels, {
        id: payload.id,
        changes: {
          name: payload.name,
        },
      });
    },

    changeCurrentChannel: (state, { payload }: PayloadAction<{ id: ICurrentChannelId }>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload.id;
    },
  },
});

export const {
  addChannel,
  setChannels,
  changeCurrentChannel,
  removeChannel,
  renameChannel,
} = channelsSlice.actions;

export const { selectAll: selectAllChannels, selectById: selectChannelById } = channelsAdapter.getSelectors<RootState>(
  (state) => state.channelsInformation.channels,
);

export const selectCurrentChannelId = (state: RootState) => state.channelsInformation.currentChannelId;

export default channelsSlice.reducer;
