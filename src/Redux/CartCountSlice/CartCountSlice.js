import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  count: "",
};

const cartCountSlice = createSlice({
  name: "cartCount",
  initialState,
  reducers: {
    userEmail: (state, { payload }) => {
      state.email = payload.email;
      state.count =
        parseInt(localStorage.getItem(`${payload.email}CartCount`)) || 0;
    },
    increment: (state) => {
      state.count = state.count + 1;
      localStorage.setItem(`${state.email}CartCount`, state.count);
    },
    decrement: (state) => {
      state.count = state.count - 1;
      localStorage.setItem(`${state.email}CartCount`, state.count);
    },
    resetCart: (state) => {
      state.count = 0;
      localStorage.setItem(`${state.email}CartCount`, state.count);
    },
  },
});

export const { userEmail, increment, decrement, resetCart } =
  cartCountSlice.actions;

export default cartCountSlice.reducer;
