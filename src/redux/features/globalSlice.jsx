import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'storeGlobal',
  initialState: {
    conditionChildSheet: false,
  },
  reducers: {
    storeGlobalChildSheet: (state, action) => {
      state.conditionChildSheet = action.payload.condition;
    },
  },
});

export const {storeGlobalChildSheet} = globalSlice.actions;
export default globalSlice.reducer;
