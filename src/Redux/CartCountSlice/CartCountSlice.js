import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: parseInt(localStorage.getItem(`cartCount`)) || 0,
};

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    increment: (state) => {
      state.count = state.count + 1;
      localStorage.setItem(`cartCount`, state.count);
    },
    decrement: (state) => {
      state.count = state.count - 1;
      localStorage.setItem(`cartCount`, state.count);
    },
    resetCart: (state) => {
      state.count = 0;
      localStorage.setItem(`cartCount`, state.count);
    },
  },
});

export const { increment, decrement, resetCart } = cartCountSlice.actions;

export default cartCountSlice.reducer;
