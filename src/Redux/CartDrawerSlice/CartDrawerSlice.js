import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const cartDrawerSlice = createSlice({
  name: "cartDrawer",
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.open = true;
    },
    closeDrawer: (state) => {
      state.open = false;
    },
    toggleDrawer: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openDrawer, closeDrawer, toggleDrawer } =
  cartDrawerSlice.actions;

export default cartDrawerSlice.reducer;
