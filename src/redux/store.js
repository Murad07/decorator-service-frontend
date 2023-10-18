import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/api";
import userReducer from "./features/userSlice";
import authSlice from "./features/authSlice";
import cardReducer from "./features/cartSlice";

export default configureStore({
  reducer: {
    auth: authSlice,
    user: userReducer,
    cart: cardReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
