import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '@/redux/slices/channels/channelsSlice';
import messagesReducer from '@/redux/slices/messages/messagesSlice';
import modalsSlice from '@/redux/slices/modals/modalsSlice';
import api from './api';

const store = configureStore({
  reducer: {
    channelsInformation: channelsReducer,
    messagesInformation: messagesReducer,
    modalsInformation: modalsSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
