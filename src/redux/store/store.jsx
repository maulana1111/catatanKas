import {configureStore} from '@reduxjs/toolkit';
import stmSlice from '../features/stmSlice';
import globalSlice from '../features/globalSlice';

export const store = configureStore({
  reducer: {
    // stm: stmSlice,
    globalStm: globalSlice,
  },
});
