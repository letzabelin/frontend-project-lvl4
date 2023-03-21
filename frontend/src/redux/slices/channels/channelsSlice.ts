import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@/redux/store';
import type { IChannel, ICurrentChannelId } from '@/types/Chat';

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
    setChannels: (state, { payload }) => {
      const rawChannels = payload as IChannel[];
      channelsAdapter.setAll(state.channels, rawChannels);
    },

    addChannel: () => {},

    removeChannel: () => {},

    renameChannel: () => {},

    changeCurrentChannel: (state, { payload }) => {
      const currentChannelId = payload as ICurrentChannelId;
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = currentChannelId;
    },
  },
});

export const { setChannels, changeCurrentChannel } = channelsSlice.actions;

export const { selectAll: selectAllChannels, selectById: selectChannelById } = channelsAdapter.getSelectors<RootState>(
  (state) => state.channelsInformation.channels,
);

export const selectCurrentChannelId = (state: RootState) => state.channelsInformation.currentChannelId;

export default channelsSlice.reducer;
