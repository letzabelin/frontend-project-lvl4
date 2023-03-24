import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { IModalTypes } from '@/types';

interface ModalState {
  isOpened: boolean;
  type: IModalTypes | null;
}

const initialModalsState: ModalState = {
  isOpened: false,
  type: null,
};

const modalsSlice = createSlice({
  name: 'messagesInformation',

  initialState: initialModalsState,

  reducers: {
    openModal: (state, { payload }: PayloadAction<IModalTypes>) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = true;
      // eslint-disable-next-line no-param-reassign
      state.type = payload;
    },

    closeModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = false;
      // eslint-disable-next-line no-param-reassign
      state.type = null;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;

export default modalsSlice.reducer;
