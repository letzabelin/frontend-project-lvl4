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
    setChannels: (state, { payload }: PayloadAction<IChannel[]>) => {
      channelsAdapter.setAll(state.channels, payload);
    },

    addChannel: (state, { payload }: PayloadAction<IChannel>) => {
      channelsAdapter.addOne(state.channels, payload);
      // eslint-disable-next-line
      state.currentChannelId = payload.id;
    },

    removeChannel: () => {},

    renameChannel: () => {},

    changeCurrentChannel: (state, { payload }: PayloadAction<ICurrentChannelId>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = payload;
    },
  },
});

export const { addChannel, setChannels, changeCurrentChannel } = channelsSlice.actions;

export const { selectAll: selectAllChannels, selectById: selectChannelById } = channelsAdapter.getSelectors<RootState>(
  (state) => state.channelsInformation.channels,
);

export const selectCurrentChannelId = (state: RootState) => state.channelsInformation.currentChannelId;

export default channelsSlice.reducer;
