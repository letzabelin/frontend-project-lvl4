import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IChannel, IModalTypes } from '@/types';

interface ModalState {
  isOpened: boolean;
  type: IModalTypes | null;
  extra: IChannel['id'] | null;
}

const initialModalsState: ModalState = {
  isOpened: false,
  type: null,
  extra: null,
};

const modalsSlice = createSlice({
  name: 'messagesInformation',

  initialState: initialModalsState,

  reducers: {
    openModal: (state, { payload }: PayloadAction<{type: IModalTypes, extra?: IChannel['id'] }>) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = true;
      // eslint-disable-next-line no-param-reassign
      state.type = payload.type;
      // eslint-disable-next-line no-param-reassign
      state.extra = payload.extra ?? null;
    },

    closeModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = false;
      // eslint-disable-next-line no-param-reassign
      state.type = null;
      // eslint-disable-next-line no-param-reassign
      state.extra = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
