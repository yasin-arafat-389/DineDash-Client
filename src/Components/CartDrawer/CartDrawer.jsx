/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  getUpdatedCustomOrder,
  getUpdatedRegularOrder,
} from "../../Redux/MyCartSlice/MyCartSlice";
import useAuth from "../../Hooks/useAuth";
import { MdCancel } from "react-icons/md";
import { decrement } from "../../Redux/CartCountSlice/CartCountSlice";

const CartDrawer = () => {
  const open = useSelector((state) => state.cartDrawer.open);
  const regularOrders = useSelector((state) => state.myCart.regularOrders);
  const customOrders = useSelector((state) => state.myCart.customOrders);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useAuth();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  const handleDecrement = (id) => {
    const updatedCart = regularOrders.map((item) => {
      if (item.identifier === id) {
        const updatedQuantity = Math.max(item.quantity - 1, 1);
        const updatedTotalPrice = updatedQuantity * item.price;
        return {
          ...item,
          quantity: updatedQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });

    localStorage.setItem(`${user?.email}Cart`, JSON.stringify(updatedCart));
    dispatch(getUpdatedRegularOrder());
  };

  const handleIncrement = (id) => {
    const updatedCart = regularOrders.map((item) => {
      if (item.identifier === id) {
        const updatedQuantity = item.quantity + 1;
        const updatedTotalPrice = updatedQuantity * item.price;
        return {
          ...item,
          quantity: updatedQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });

    localStorage.setItem(`${user?.email}Cart`, JSON.stringify(updatedCart));
    dispatch(getUpdatedRegularOrder());
  };

  const handleRemoveFromCart = (index) => {
    dispatch(decrement());
    const updatedCart = [...regularOrders];
    updatedCart.splice(index, 1);
    localStorage.setItem(`${user?.email}Cart`, JSON.stringify(updatedCart));
    dispatch(getUpdatedRegularOrder());
  };

  const handleDeleteBurger = (index) => {
    dispatch(decrement());
    const updatedBurger = [...customOrders];
    updatedBurger.splice(index, 1);
    localStorage.setItem(`${user?.email}`, JSON.stringify(updatedBurger));
    dispatch(getUpdatedCustomOrder());
  };

  return (
    <div>
      <Drawer
        overlay={false}
        placement="right"
        open={open}
        className="p-4 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            My Cart
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            className="bg-gray-200"
            onClick={handleCloseDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        {/* Cart Contents */}
        <div className="overflow-auto h-full pb-28">
          {regularOrders.length === 0 && customOrders.length === 0 ? (
            <div className="mt-4">
              <div className="flex flex-col gap-2 justify-center items-center">
                <img src="/emptyCart.png" alt="" />
                <h1 className="text-gray-700 font-bold text-2xl">
                  Your Cart Is Empty
                </h1>

                <span className="text-gray-700">
                  Looks like {`you're`} not hungry yet!!
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 pb-5">
                {/* Regular Order */}
                {regularOrders.map((item, index) => (
                  <div
                    key={index}
                    className="cartFood-wrapper w-full flex gap-3 bg-gray-200 border border-blue-600 p-2 
                    rounded-lg"
                  >
                    <div className="w-[50%]">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div>
                      <h1 className="font-semibold text-gray-700 text-sm">
                        {item.name}
                      </h1>

                      {/* Quantity update */}
                      <div className="flex items-center my-4">
                        <button
                          className="cursor-pointer rounded-l bg-gray-400 duration-100 px-2 hover:bg-pink-500 hover:text-blue-50 text-lg"
                          onClick={() => handleDecrement(item.identifier)}
                        >
                          -
                        </button>

                        <h2 className="mx-3 text-sm">{item?.quantity}</h2>

                        <button
                          className="cursor-pointer rounded-r bg-gray-400 duration-100 px-2 hover:bg-pink-500 hover:text-blue-50 text-lg"
                          onClick={() => handleIncrement(item.identifier)}
                        >
                          +
                        </button>
                      </div>

                      <div className="flex justify-between items-center gap-2 mt-5">
                        <h1 className="text-gray-900 text-sm">
                          ৳ {item.totalPrice}
                        </h1>

                        <button onClick={() => handleRemoveFromCart(index)}>
                          <MdCancel size={"22"} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Custom Order */}
                {customOrders.map((item, index) => (
                  <div
                    key={index}
                    className="cartFood-wrapper w-full flex gap-3 bg-gray-200 border border-blue-600 p-2 
                    rounded-lg"
                  >
                    <div className="w-[50%]">
                      <img
                        src="https://promptsideas.b-cdn.net/prompts/1273/G5mkQ72DKdLzGbDJXCkK.png"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col gap-3">
                      <h1 className="font-semibold text-gray-700 text-sm">
                        Custom Burger
                      </h1>

                      <h1 className="text-gray-800 text-sm">
                        From{" "}
                        <span className="font-semibold text-gray-700 italic">
                          {item.provider}
                        </span>
                      </h1>

                      <div className="flex justify-between items-center gap-2">
                        <h1 className="text-gray-900 text-sm">
                          ৳ {item.totalPrice}
                        </h1>

                        <button onClick={() => handleDeleteBurger(index)}>
                          <MdCancel size={"22"} className="text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="fixed bottom-0 pt-5 pb-2 w-[275px] bg-white">
          <Button
            onClick={() => {
              navigate("/checkout");
              dispatch(closeDrawer());
            }}
            fullWidth
            className="bg-[#0866ff] capitalize text-[15px]"
          >
            Go to checkout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
