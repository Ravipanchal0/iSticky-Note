import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.authStatus = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
