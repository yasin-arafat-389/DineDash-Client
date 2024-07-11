import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};

const NavDrawerSlice = createSlice({
  name: "navDrawer",
  initialState,
  reducers: {
    openNavDrawer: (state) => {
      state.open = true;
    },
    closeNavDrawer: (state) => {
      state.open = false;
    },
    toggleNavDrawer: (state) => {
      state.open = !state.open;
    },
  },
});

export const { openNavDrawer, closeNavDrawer, toggleNavDrawer } =
  NavDrawerSlice.actions;

export default NavDrawerSlice.reducer;
