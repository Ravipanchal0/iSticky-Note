import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import noteReducer from "./noteSlice.js";
import apiSlice from "./apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
