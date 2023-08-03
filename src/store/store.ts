import {configureStore} from '@reduxjs/toolkit';
import storeReducer from './initialSlice';

const store = configureStore({
  reducer: {
    info: storeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
