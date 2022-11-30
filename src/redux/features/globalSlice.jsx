import {createSlice} from '@reduxjs/toolkit';

const globalSlice = createSlice({
  name: 'storeGlobal',
  initialState: {
    conditionChildSheet: false,
    secondConditionChildSheet : false,
  },
  reducers: {
    storeGlobalChildSheet: (state, action) => {
      state.conditionChildSheet = action.payload.condition;
    },
    storeGlobalSecChildSheet: (state, action) => {
      state.secondConditionChildSheet = action.payload.condition;
    },
  },
});

export const {storeGlobalChildSheet,storeGlobalSecChildSheet } = globalSlice.actions;
export default globalSlice.reducer;
