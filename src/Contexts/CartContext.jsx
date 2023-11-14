/* eslint-disable react/prop-types */
import { createContext } from "react";

export const cartContext = createContext();

const CartContext = ({ children }) => {
  let cartInfo = {};

  return (
    <cartContext.Provider value={cartInfo}>{children}</cartContext.Provider>
  );
};

export default CartContext;
