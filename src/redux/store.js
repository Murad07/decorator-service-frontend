import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import userReducer from "./features/userSlice";
import authSlice from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
