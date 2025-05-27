import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import noteReducer from "./noteSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
  },
});

export default store;
