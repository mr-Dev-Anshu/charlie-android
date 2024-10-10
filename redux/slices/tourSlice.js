import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tour: [],
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTour: (state, action) => {
      state.tour = action.payload;
    },
  },
});

export const { setTour } = tourSlice.actions;

export default tourSlice.reducer;
