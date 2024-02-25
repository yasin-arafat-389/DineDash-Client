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
  },
});

export const { getUserEmail } = myCartSlice.actions;

export default myCartSlice.reducer;
