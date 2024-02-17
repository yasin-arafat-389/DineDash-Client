import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
    },
    decrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { increment, decrement } = cartCountSlice.actions;

export default cartCountSlice.reducer;
