import {createSlice} from '@reduxjs/toolkit';
import initialStore from './initialState';

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialStore,
  reducers: {
    increment: state => {
      state.id += '1';
    },
  },
});

export const {increment} = storeSlice.actions;
export default storeSlice.reducer;
