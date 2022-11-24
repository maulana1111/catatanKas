import {createSlice} from '@reduxjs/toolkit';

const stmSlice = createSlice({
  name: 'storeUser',
  initialState: {
    user: {
      user_logged_in: false,
      nama_user: '',
    },
  },
  reducers: {
    storeUser: (state, action) => {
      state.user.user_logged_in = true;
      state.user.nama_user = action.payload.nama;
    },
  },
});

export const {storeUser} = stmSlice.actions;
export default stmSlice.reducer;