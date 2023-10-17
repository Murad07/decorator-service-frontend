import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
// import serviceSlice from "./features/serviceSlice";
import authSlice from "./features/authSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    // availableService: serviceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
