import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BiSolidCommentEdit } from "react-icons/bi";
import "./CheckOut.css";
import Swal from "sweetalert2";
import OrderConfirmation from "../../Components/PopUp/OrderConfirmation/OrderConfirmation";
import TryBurgerBuilder from "../../../Utility/FancyButton/TryBurgerBuilder/TryBurgerBuilder";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { BsTrash3 } from "react-icons/bs";

const CheckOut = () => {
  const [burger, setBurger] = useState([]);
  const [cartFoods, setCartFoods] = useState([]);
  let { user } = useAuth();

  // Modal
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  // Handling Custom Burger
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(`${user?.email}`));
    if (storedData) {
      setBurger(storedData);
    }
  }, [user]);

  const handleOpen = (note, index) => {
    setOpen(true);
    setNote(note);
    setSelectedItemIndex(index);
  };

  const handleNoteUpdate = (updatedNote) => {
    const updatedBurger = [...burger];
    updatedBurger[selectedItemIndex].note = updatedNote;
    setBurger(updatedBurger);
    localStorage.setItem(`${user?.email}`, JSON.stringify(updatedBurger));
  };

  const handleDeleteBurger = (index) => {
    Swal.fire({
      title: "Are you sure you want to remove this burger?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBurger = [...burger];
        updatedBurger.splice(index, 1);
        setBurger(updatedBurger);
        localStorage.setItem(`${user?.email}`, JSON.stringify(updatedBurger));
        toast.success(`Burger has been removed!`, {
          style: {
            border: "2px solid green",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
      }
    });
  };

  // Handlimg Cart foods
  useEffect(() => {
    const storedFood = JSON.parse(localStorage.getItem(`${user?.email}Cart`));
    if (storedFood) {
      setCartFoods(storedFood);
    }
  }, [user]);

  const handleIncrement = (id) => {
    const updatedCart = cartFoods.map((item) => {
      if (item.id === id) {
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
    setCartFoods(updatedCart);
    localStorage.setItem(`${user?.email}Cart`, JSON.stringify(updatedCart));
  };

  const handleDecrement = (id) => {
    const updatedCart = cartFoods.map((item) => {
      if (item.id === id) {
        const updatedQuantity = Math.max(item.quantity - 1, 1); // Ensure quantity is not less than 1
        const updatedTotalPrice = updatedQuantity * item.price;
        return {
          ...item,
          quantity: updatedQuantity,
          totalPrice: updatedTotalPrice,
        };
      }
      return item;
    });

    setCartFoods(updatedCart);
    localStorage.setItem(`${user?.email}Cart`, JSON.stringify(updatedCart));
  };

  const handleRemoveFromCart = (index, food) => {
    Swal.fire({
      title: `Are you sure you want to remove ${food}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = [...cartFoods];
        updatedCart.splice(index, 1);
        setCartFoods(updatedCart);
        localStorage.setItem(`${user?.email}Cart`, JSON.stringify(updatedCart));
        toast.success(`${food} has been removed!`, {
          style: {
            border: "2px solid green",
            padding: "8px",
            color: "#713200",
          },
          iconTheme: {
            primary: "green",
            secondary: "#FFFAEE",
          },
        });
      }
    });
  };

  // Handling place order event
  const [confirmation, setConfirmation] = useState(false);
  let handlePlaceOrder = () => {
    setConfirmation(!confirmation);
  };

  return (
    <div className="mb-10">
      {/* Modal for updating note */}
      <Dialog open={open} handler={() => setOpen(false)}>
        <DialogHeader>Edit your note</DialogHeader>
        <DialogBody>
          <Textarea
            color="cyan"
            label="Custom Note"
            defaultValue={note ? note : ""}
            onChange={(e) => setNote(e.target.value)}
          />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setOpen(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleNoteUpdate(note);
              setOpen(false);
            }}
          >
            <span>Add</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Modal for order confirmation message */}
      <Dialog open={confirmation} handler={handlePlaceOrder}>
        <OrderConfirmation state={handlePlaceOrder} />
      </Dialog>

      <div className="flex flex-col items-center bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32"></div>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your order and proceed to payment.
          </p>

          {/* Burger in cart */}
          <div
            className="mt-8 space-y-3 rounded-lg border-2 border-dashed border-blue-500 bg-white px-2 py-4 
           sm:px-6"
          >
            <h3 className="text-xl font-medium">Custom Burger</h3>
            {burger.length === 0 ? (
              <div className="flex flex-col justify-center items-center">
                <img src="https://i.ibb.co/v3XtdVh/empty-cart.png" />
                <div className="flex justify-center mt-7">
                  <TryBurgerBuilder text="Create and add a burger" />
                </div>
              </div>
            ) : (
              <>
                <div>
                  {burger.map((item, index) => (
                    <Card
                      className="w-full max-w-[48rem] grid grid-cols-2 shadow-none"
                      key={index}
                    >
                      <CardHeader
                        shadow={false}
                        floated={false}
                        className="m-0 w-5/5 shrink-0 rounded-r-none flex flex-col justify-center items-center"
                      >
                        <img
                          src="https://i.ibb.co/HYR6fx4/top.jpg"
                          className="w-[80%] object-cover"
                        />
                        {item?.ingredients?.map((item, index) => (
                          <img
                            key={index}
                            src={item.image}
                            className="w-[80%] object-cover"
                          />
                        ))}
                        <img
                          src="https://i.ibb.co/LQ6StVG/bottom.jpg"
                          className="w-[80%] object-cover"
                        />
                      </CardHeader>

                      <div className="flex flex-col justify-center items-center gap-5">
                        <Typography color="gray" className="mb-4 font-normal">
                          <div className="flex items-center">
                            {item.note ? (
                              <div className="quote-container">
                                <i className="pin"></i>
                                <blockquote className="note yellow flex gap-4">
                                  {item.note}

                                  <BiSolidCommentEdit
                                    className="text-[25px] cursor-pointer"
                                    onClick={() => handleOpen(item.note, index)}
                                  />
                                </blockquote>
                              </div>
                            ) : (
                              <div className="quote-container">
                                <i className="pin"></i>
                                <blockquote className="note yellow flex gap-4">
                                  No Notes
                                  <BiSolidCommentEdit
                                    className="text-[25px] cursor-pointer"
                                    onClick={() => handleOpen(item.note, index)}
                                  />
                                </blockquote>
                              </div>
                            )}
                          </div>
                        </Typography>

                        <p className="text-lg font-bold">৳ {item.totalPrice}</p>

                        <div className="flex gap-5 justify-center items-center">
                          <span className="inline-flex items-center justify-center p-2 text-xs font-bold leading-none text-white bg-indigo-700 rounded">
                            {item.provider}
                          </span>
                          <button
                            onClick={() => handleDeleteBurger(index)}
                            className="bg-red-600 p-2 rounded-lg"
                          >
                            <BsTrash3 className="text-[#fff] text-[20px]" />
                          </button>
                        </div>
                      </div>
                      <div></div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Foods In Cart */}
          <div
            className={`mt-8 space-y-3 rounded-lg border-2 border-dashed border-blue-500 ${
              cartFoods.length === 0
                ? "bg-white"
                : "bg-blue-100 !border !border-solid"
            } px-2 py-4 sm:px-6`}
          >
            {cartFoods.length === 0 ? (
              <div className="flex flex-col justify-center items-center">
                <img src="https://i.ibb.co/v3XtdVh/empty-cart.png" alt="" />
              </div>
            ) : (
              cartFoods.map((item, index) => (
                <>
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-xl sm:flex sm:justify-start">
                    <img
                      src={item?.image}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {item?.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">
                          {item?.restaurant}
                        </p>
                      </div>

                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100 justify-center">
                          <span
                            className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-pink-500 hover:text-blue-50"
                            onClick={() => handleDecrement(item.id)}
                          >
                            -
                          </span>
                          <h2 className="mx-3">{item?.quantity}</h2>
                          <span
                            className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100        hover:bg-pink-500 hover:text-blue-50"
                            onClick={() => handleIncrement(item.id)}
                          >
                            +
                          </span>
                        </div>
                        <div className="flex flex-col gap-4 items-center space-x-4">
                          <h2 className="text-lg font-bold text-gray-900">
                            ৳ {item?.totalPrice}
                          </h2>

                          <button
                            onClick={() =>
                              handleRemoveFromCart(index, item?.name)
                            }
                            className="bg-red-600 p-2 rounded-lg"
                          >
                            <BsTrash3 className="text-[#fff] text-[20px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>

          {/* Shipping Methods */}
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="radio"
                checked
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-[120px] object-contain"
                  src="https://static.vecteezy.com/system/resources/previews/002/952/794/original/cash-on-delivery-steacker-free-vector.jpg"
                  alt=""
                />
                <div className="ml-5 flex flex-col items-center justify-center">
                  <span className="font-semibold">Cash On Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 3-4 Hours
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                name="credit-expiry"
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <select
                type="text"
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="State">State</option>
              </select>
              <input
                type="text"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">$399.00</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">$408.00</p>
            </div>
          </div>

          <button
            onClick={() => handlePlaceOrder()}
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
