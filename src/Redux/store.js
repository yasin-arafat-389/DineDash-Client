import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from "./CartCountSlice/CartCountSlice";
import cartDrawerReducer from "./CartDrawerSlice/CartDrawerSlice";
import myCartReducer from "./MyCartSlice/MyCartSlice";

const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
    cartDrawer: cartDrawerReducer,
    myCart: myCartReducer,
  },
});

export default store;
