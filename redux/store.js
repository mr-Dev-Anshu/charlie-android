import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    role: userReducer,
    profile: userReducer,
  },
});

export default store;
