import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./bookingSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    booking: bookingReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
