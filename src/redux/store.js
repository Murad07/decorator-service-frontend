import { configureStore } from "@reduxjs/toolkit";
// import { apiSlice } from "./api/api";
import pcbuildReducer from "./features/pcbuildSlice";

export default configureStore({
  reducer: {
    pcbuild: pcbuildReducer,
    // [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
