import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import initialStore from './initialState';

export type actionType = {
  id: string;
};

export const storeSlice = createSlice({
  name: 'store',
  initialState: initialStore,
  reducers: {
    changeId: (state, action: PayloadAction<actionType>) => {
      const {id} = action.payload;
      state.id = id;
    },
  },
});

export const {changeId} = storeSlice.actions;
export default storeSlice.reducer;
