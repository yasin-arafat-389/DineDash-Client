import { useContext } from "react";
import { cartContext } from "../Contexts/CartContext";

const useCart = () => {
  return useContext(cartContext);
};

export default useCart;
