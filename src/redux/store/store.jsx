import { configureStore } from '@reduxjs/toolkit';
import stmSlice from '../features/stmSlice';

export const store = configureStore({
  reducer: {
    stm: stmSlice,
  },
});
