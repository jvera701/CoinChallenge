import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialStore from './initialState';
import {DetailCoinData} from '@api/api';

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialStore,
  reducers: {
    updateStore: (state, action: PayloadAction<DetailCoinData>) => {
      state.price_usd = action.payload.price_usd;
      state.percent_change_7d = action.payload.percent_change_7d;
      state.percent_change_24h = action.payload.percent_change_24h;
      state.percent_change_1h = action.payload.percent_change_1h;
    },
  },
});

export const {updateStore} = storeSlice.actions;
export default storeSlice.reducer;
