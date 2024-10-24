import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  role: null,
  profile: null,
  members: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { setUser, clearUser, setRole, setProfile, setMembers } =
  userSlice.actions;

export default userSlice.reducer;
