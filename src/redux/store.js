import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/api";
import pcbuildReducer from "./features/pcbuildSlice";
import authSlice from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    pcbuild: pcbuildReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
