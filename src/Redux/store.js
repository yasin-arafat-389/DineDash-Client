import { configureStore } from "@reduxjs/toolkit";
import cartCountReducer from "./CartCountSlice/CartCountSlice";
import cartDrawerReducer from "./CartDrawerSlice/CartDrawerSlice";
import myCartReducer from "./MyCartSlice/MyCartSlice";
import navDrawerReducer from "./NavDrawerSlice/NavDrawerSlice";

const store = configureStore({
  reducer: {
    cartCount: cartCountReducer,
    cartDrawer: cartDrawerReducer,
    navDrawer: navDrawerReducer,
    myCart: myCartReducer,
  },
});

export default store;
