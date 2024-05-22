import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { increment } from "../../Redux/CartCountSlice/CartCountSlice";
import { getUpdatedRegularOrder } from "../../Redux/MyCartSlice/MyCartSlice";
import { openDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import useAuth from "../../Hooks/useAuth";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import ReviewsSkeletonLoader from "./ReviewsSkeletonLoader";

const FoodDetails = () => {
  let axios = useAxios();
  let { user } = useAuth();
  let dispatch = useDispatch();
  let id = useParams();
  let foodId = id.id;
  let navigate = useNavigate();

  //   Fetching Food Details
  let {
    data: foodDetails = [],
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["singleFoodDetails"],
    queryFn: async () => {
      let res = await axios.get(`/food/details?id=${foodId}`).then();
      return res.data;
    },
  });

  //   Fetching reviews
  let { data: reviews = [], isFetching: isReviewsLoading } = useQuery({
    queryKey: ["singleFoodReviews"],
    queryFn: async () => {
      let res = await axios.get(`/reviews/foods?id=${foodId}`).then();
      return res.data;
    },
  });

  //   Handling Tabs
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  //   Handle Show Reviews
  const handleShowReviews = () => {
    setActiveTab("tab2");

    // Scroll to the element with ID 'abiss'
    const element = document.getElementById("food-reviews");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  //   Handling quantity
  const [quantity, setQuantity] = useState(1);
  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };
  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  let totalPrice = quantity * foodDetails?.price;

  //Handle show alert
  let handleShowAlert = () => {
    toast.error(`You must login first!!`, {
      style: {
        border: "2px solid red",
        padding: "8px",
        color: "#713200",
      },
      iconTheme: {
        primary: "red",
        secondary: "#FFFAEE",
      },
    });
  };

  //   Handle Add to cart
  const handleAddToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem(`${user?.email}Cart`)) || [];

    const date = new Date();
    const day = date.getDate();
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const year = date.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

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

    let saveToLocalStorage = {
      identifier: foodDetails._id,
      name: foodDetails?.name,
      image: foodDetails?.image,
      price: foodDetails?.price,
      status: "order received",
      date: formattedDate,
      quantity: quantity,
      totalPrice: totalPrice,
      restaurant: foodDetails?.restaurant,
      isAcceptedByRider: false,
      orderId: generateRandomString(),
      reviewed: false,
    };

    const existingItemIndex = existingCart.findIndex(
      (item) => item.identifier === foodDetails?._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
      existingCart[existingItemIndex].totalPrice +=
        saveToLocalStorage.totalPrice;
    } else {
      existingCart.push(saveToLocalStorage);
      dispatch(increment());
    }

    localStorage.setItem(`${user?.email}Cart`, JSON.stringify(existingCart));

    dispatch(getUpdatedRegularOrder());

    dispatch(openDrawer());
    setQuantity(1);
  };

  if (isError) {
    return navigate("/browse-foods");
  }

  return (
    <div>
      <style>
        {`
        @keyframes pulse {
            0% {
            background-position: 100% 0;
            }
            100% {
            background-position: -100% 0;
            }
        }

        .animate-pulse {
            background-image: linear-gradient(to right, rgba(255,255,255,0) 0%, #ccc 50%, rgba(255,255,255,0) 100%);
            background-size: 200% 100%;
            animation: pulse 1.2s infinite;
        }
    `}
      </style>

      <div className="bg-gray-100">
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-10 md:py-24 lg:py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              {isFetching ? (
                <div className="lg:w-1/2 w-full lg:h-[400px] h-64 rounded bg-gray-500 animate-pulse"></div>
              ) : (
                <img
                  className="lg:w-1/2 w-full lg:h-[400px] h-64 rounded"
                  src={foodDetails.image}
                />
              )}

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-0 mt-6 lg:mt-0">
                {isFetching ? (
                  <div className="h-5 w-[150px] rounded-lg bg-gray-400 animate-pulse"></div>
                ) : (
                  <h2 className="text-lg title-font text-gray-700 tracking-widest">
                    {foodDetails.restaurant}
                  </h2>
                )}

                {isFetching ? (
                  <div className="h-10 w-[300px] mt-3 rounded-lg bg-gray-400 animate-pulse"></div>
                ) : (
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 mt-3">
                    {foodDetails.name}
                  </h1>
                )}

                <div className="flex">
                  <span className="flex items-center">
                    {isReviewsLoading ? (
                      <div className="h-5 w-[150px] rounded-lg bg-gray-400 animate-pulse mt-2"></div>
                    ) : (
                      <span
                        onClick={handleShowReviews}
                        className="mt-2 text-blue-500 hover:underline cursor-pointer font-semibold"
                      >
                        See Reviews
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex mt-3">
                  {isFetching ? (
                    <div className="h-5 w-[150px] rounded-lg bg-gray-400 animate-pulse"></div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">Category:</span>
                      <h2 className="bg-yellow-500 font-semibold rounded-lg text-gray-700 py-1 px-2">
                        {foodDetails.category}
                      </h2>
                    </div>
                  )}
                </div>

                <div className="flex mt-7">
                  {isFetching ? (
                    <span className="h-10 w-[150px] rounded-lg bg-gray-400 animate-pulse"></span>
                  ) : (
                    <span className="title-font font-medium text-2xl text-gray-900">
                      ৳ {foodDetails.price}
                    </span>
                  )}
                </div>

                <div className="flex flex-row gap-32 w-full justify-center bg-gray-300 p-3 mt-10 rounded-lg">
                  <button onClick={handleDecreaseQuantity}>
                    <AiFillMinusCircle className="text-pink-500 text-[30px] cursor-pointer" />
                  </button>
                  <p className="text-[20px] font-bold">{quantity}</p>
                  <button onClick={handleIncreaseQuantity}>
                    <AiFillPlusCircle className="text-pink-500 text-[30px] cursor-pointer" />
                  </button>
                </div>

                {user ? (
                  <Button
                    id="food-reviews"
                    size="lg"
                    fullWidth
                    className="bg-blue-600 mt-5 capitalize flex justify-center items-center gap-3 text-lg"
                    onClick={handleAddToCart}
                  >
                    <HiOutlineShoppingBag size={"30"} />
                    Add To Cart
                  </Button>
                ) : (
                  <Link to="/sign-in" state={location?.pathname}>
                    <Button
                      id="food-reviews"
                      size="lg"
                      fullWidth
                      className="bg-blue-600 mt-5 capitalize flex justify-center items-center gap-3 text-lg"
                      onClick={handleShowAlert}
                    >
                      <HiOutlineShoppingBag size={"30"} />
                      Add To Cart
                    </Button>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:w-4/5 mx-auto mt-10 md:mt-20 lg:mt-20">
              <div>
                <div className="grid grid-cols-2 gap-5">
                  <button
                    className={`p-4 rounded ${
                      activeTab === "tab1"
                        ? "bg-indigo-500 text-white font-bold shadow-md"
                        : "bg-gray-400 text-[#000] font-bold"
                    } flex items-center justify-center`}
                    onClick={() => handleTabClick("tab1")}
                  >
                    Description
                  </button>
                  <button
                    className={`p-4 rounded ${
                      activeTab === "tab2"
                        ? "bg-indigo-500 text-white font-bold shadow-md"
                        : "bg-gray-400 text-[#000] font-bold"
                    } flex items-center justify-center`}
                    onClick={() => handleTabClick("tab2")}
                  >
                    {`Reviews (${reviews.length})`}
                  </button>
                </div>

                {activeTab === "tab1" && (
                  <div>
                    {isFetching ? (
                      <>
                        <div className="h-3 mt-7 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                        <div className="h-3 mt-1 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                        <div className="h-3 mt-1 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                        <div className="h-3 mt-1 w-full rounded-lg bg-gray-400 animate-pulse"></div>
                      </>
                    ) : (
                      <div className="mt-7 text-gray-700 font-medium">
                        {foodDetails.description}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "tab2" && (
                  <div>
                    {isReviewsLoading ? (
                      <div>
                        <ReviewsSkeletonLoader />
                      </div>
                    ) : reviews.length === 0 ? (
                      <div>
                        <div className="w-full mt-7 py-10 rounded-lg bg-gray-300">
                          <div className="bg-gray-300 w-[100px] h-[100px] mx-auto flex justify-center items-center p-3 rounded-full shadow-lg shadow-blue-500">
                            <img
                              src="https://i.ibb.co/YPNn9WM/reviews.png"
                              className="w-[60px]"
                            />
                          </div>

                          <h1 className="text-center mt-8 text-2xl text-gray-800">
                            No reviews for this food yet!!
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex flex-col gap-3 mt-7">
                          {reviews.map((item, index) => (
                            <div
                              key={index}
                              className={`w-full flex flex-col gap-4 bg-gray-900 text-gray-400 p-4 rounded-lg`}
                            >
                              <div className="flex justify-between gap-3">
                                <div className="flex items-center gap-4">
                                  <img
                                    src={item.profileImage}
                                    className="w-10 h-10 text-center object-cover rounded-full bg-white"
                                  />

                                  <span>{item.userName}</span>
                                </div>

                                <h1>{item.date}</h1>
                              </div>

                              <div>{item.review}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodDetails;
