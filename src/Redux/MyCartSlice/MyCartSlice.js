import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  regularOrders: "",
  customOrders: "",
};

const myCartSlice = createSlice({
  name: "myCart",
  initialState,
  reducers: {
    getUserEmail: (state, { payload }) => {
      state.email = payload.email;

      state.regularOrders =
        JSON.parse(localStorage.getItem(`${payload?.email}Cart`)) || [];

      state.customOrders =
        JSON.parse(localStorage.getItem(`${payload?.email}`)) || [];
    },

    getUpdatedRegularOrder: (state) => {
      state.regularOrders =
        JSON.parse(localStorage.getItem(`${state?.email}Cart`)) || [];
    },

    getUpdatedCustomOrder: (state) => {
      state.customOrders =
        JSON.parse(localStorage.getItem(`${state?.email}`)) || [];
    },
  },
});

export const { getUserEmail, getUpdatedRegularOrder, getUpdatedCustomOrder } =
  myCartSlice.actions;

export default myCartSlice.reducer;
