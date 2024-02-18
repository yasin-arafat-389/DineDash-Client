import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from "./CartCountSlice/CartCountSlice";
import cartDrawerReducer from "./CartDrawerSlice/CartDrawerSlice";

const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
    cartDrawer: cartDrawerReducer,
  },
});

export default store;
