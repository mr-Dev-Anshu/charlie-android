import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tour: [],
  bookedTour: [],
};

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setTour: (state, action) => {
      state.tour = action.payload;
    },
    setBookedTour: (state, action) => {
      state.bookedTour = action.payload;
    },
  },
});

export const { setTour, setBookedTour } = tourSlice.actions;

export default tourSlice.reducer;
