import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from "./CartCountSlice/CartCountSlice";

const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
  },
});

export default store;
