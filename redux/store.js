import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import tourReducer from "./slices/tourSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    role: userReducer,
    profile: userReducer,
    tour: tourReducer,
  },
});

export default store;

