import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialStore from './initialState';
import type {DetailCoinData} from '@api/api';

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialStore,
  reducers: {
    updateStore: (_state, action: PayloadAction<DetailCoinData>) => {
      return action.payload;
    },
  },
});

export const {updateStore} = storeSlice.actions;
export default storeSlice.reducer;
