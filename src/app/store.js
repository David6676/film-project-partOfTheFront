import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import filmSlice from "../features/film/filmSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    film: filmSlice
  },
});