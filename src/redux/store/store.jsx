import {configureStore} from '@reduxjs/toolkit';
import globalSlice from '../features/globalSlice';

export const store = configureStore({
  reducer: {
    // stm: stmSlice,
    globalStm: globalSlice,
  },
});
