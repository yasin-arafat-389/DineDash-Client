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
import TryBurgerBuilder from "../../../Utility/FancyButton/TryBurgerBuilder/TryBurgerBuilder";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { BsTrash3 } from "react-icons/bs";
import { MdAlternateEmail } from "react-icons/md";
import { FaAddressCard, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { ImSpinner9 } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";

const CheckOut = () => {
  const [burger, setBurger] = useState([]);
  const [cartFoods, setCartFoods] = useState([]);
  let { user } = useAuth();
  let axios = useAxios();
  let navigate = useNavigate();

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
  let [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");

  let { data: customerData } = useQuery({
    queryKey: ["myDeliveryAddress"],
    queryFn: async () => {
      let res = await axios.get(`/my-address?email=${user?.email}`).then();
      return res.data;
    },
  });

  useEffect(() => {
    setAddress(customerData?.address || "");
    setPhone(customerData?.phone || "");
  }, [customerData]);

  const [selectedOption, setSelectedOption] = useState(null);

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.id);
  };

  const customBurgerTotalPrice = burger.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.totalPrice);
  }, 0);

  const otherFoodsTotalPrice = cartFoods.reduce((accumulator, currentValue) => {
    return accumulator + parseInt(currentValue.totalPrice);
  }, 0);

  let subtotal = customBurgerTotalPrice + otherFoodsTotalPrice;
  let total = subtotal + 50;

  const [loading, setLoading] = useState(false);

  let handlePlaceOrder = (e) => {
    e.preventDefault();
    setLoading(true);

    if (subtotal <= 0) {
      setLoading(false);
      return Swal.fire({
        title: "Oopss!!",
        text: "Your cart is empty",
        icon: "warning",
      });
    }

    if (!selectedOption) {
      setLoading(false);
      return Swal.fire({
        title: "Oopss!!",
        text: "Your have not selected payment method",
        icon: "warning",
      });
    }

    if (!region) {
      setLoading(false);
      return Swal.fire({
        title: "Oopss!!",
        text: "Your have not selected your region",
        icon: "warning",
      });
    }

    function generateRandomString() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    let order = {
      name: user?.displayName,
      email: user?.email,
      phone: phone,
      address: address,
      burger: burger.length > 0 ? burger : [],
      cartFood: cartFoods.length > 0 ? cartFoods : [],
      orderTotal: total,
      deliveryCharge: 50,
      order: Date.now() + Math.random(5),
      randString: generateRandomString(),
      region: region,
      paymentMethod:
        selectedOption === "radio_1" ? "Cash On Delivery" : "SSLCOMMERZ",
    };

    if (selectedOption === "radio_1") {
      axios.post("/orders", order).then(() => {
        setLoading(false);

        localStorage.removeItem(user?.email);
        localStorage.removeItem(`${user?.email}Cart`);

        let redirectTo;
        if (order.cartFood?.length > 0) {
          redirectTo = "myOrders";
        } else {
          redirectTo = "customMadeBurgers";
        }

        navigate(`/order-success/${redirectTo}`);
      });
    }

    if (selectedOption !== "radio_1") {
      fetch("http://localhost:5000/orders/sslcommerz", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(order),
      })
        .then((res) => res.json())
        .then((result) => {
          setLoading(false);
          window.location.replace(result.url);
        });

      localStorage.removeItem(user?.email);
      localStorage.removeItem(`${user?.email}Cart`);
    }
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
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Delivery Details</p>
          <p className="text-gray-400">
            Complete your order by providing your delivery details.
          </p>

          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder}>
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
                  className="w-full rounded-md border border-blue-500 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 cursor-not-allowed"
                  value={user?.email}
                  disabled
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <MdAlternateEmail className="text-blue-600" />
                </div>
              </div>

              <label
                htmlFor="phone"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Phone
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="w-full rounded-md border border-blue-500 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-600"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => {
                    const enteredValue = e.target.value;
                    const isNumeric = /^\d+$/.test(enteredValue);
                    if (isNumeric || enteredValue === "") {
                      setPhone(enteredValue);
                    }
                  }}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaPhone className="text-blue-600" />
                </div>
              </div>

              <label
                htmlFor="address"
                className="mt-4 mb-2 block text-sm font-medium"
              >
                Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="w-full rounded-md border border-blue-500 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500 placeholder:text-gray-600"
                  placeholder="Enter your full address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <FaAddressCard className="text-blue-600" />
                </div>
              </div>

              <select
                name="region"
                className="w-full mt-5 text-gray-700 border border-blue-500"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  Select Region
                </option>
                <option value="Mirpur">Mirpur</option>
                <option value="Dhanmondi">Dhanmondi</option>
                <option value="Uttara">Uttara</option>
              </select>

              {/* Payment Methods */}
              <div className="flex flex-col gap-5">
                <p className="mt-8 text-lg font-medium">Payment Methods</p>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    onChange={handleRadioChange}
                  />
                  <span className="peer-checked:border-blue-500 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-blue-500 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-500 p-4"
                    htmlFor="radio_1"
                  >
                    <img
                      className="w-[120px] object-contain"
                      src="https://i.ibb.co/kBmCdgH/cash-on-delivery-steacker-free-vector.jpg"
                      alt=""
                    />
                    <div className="ml-5 flex flex-col items-center justify-center">
                      <span className="font-semibold">Cash On Delivery</span>
                    </div>
                  </label>
                </div>

                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                    onChange={handleRadioChange}
                  />
                  <span className="peer-checked:border-blue-500 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                  <label
                    className="peer-checked:border-2 peer-checked:border-blue-500 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-500 p-4"
                    htmlFor="radio_2"
                  >
                    <img
                      className="w-[120px] object-contain"
                      src="https://i.ibb.co/FHHN9BV/sslcommerz.png"
                      alt=""
                    />
                    <div className="ml-5 flex flex-col items-center justify-center">
                      <span className="font-semibold">SSLCOMMERZ</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">৳ {subtotal}.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Delivery Charge
                  </p>
                  <p className="font-semibold text-gray-900">
                    {subtotal <= 0 ? "৳ 0.00" : ` ৳ 50.00`}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {subtotal <= 0 ? "৳ 0.00" : ` ৳ ${total}.00`}
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
              disabled={loading ? true : false}
            >
              {loading ? (
                <div className="flex justify-center items-center gap-4">
                  <ImSpinner9 className="animate-spin text-[20px]" />
                  Placing Order
                </div>
              ) : (
                "Place Order"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
