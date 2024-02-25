import useAxios from "../../Hooks/useAxios";
import { Link, useParams } from "react-router-dom";
import "./RestaurantPage.css";
import { AiFillFire } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import NoFoodsFound from "../../../Utility/NoFoodsFound/NoFoodsFound";
import RestaurantPageSkeletonLoader from "../../../Utility/RestaurantPageSkeletonLoader/RestaurantPageSkeletonLoader";
import { increment } from "../../Redux/CartCountSlice/CartCountSlice";
import { useDispatch } from "react-redux";
import ReviewsSkeletonLoader from "../BrowseFoods/ReviewsSkeletonLoader";

const RestaurantPage = () => {
  let restaurantPath = useParams();
  let pathname = restaurantPath.name;
  let axios = useAxios();
  let { user } = useAuth();
  let dispatch = useDispatch();

  // States
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [details, setDetails] = useState();

  const [isScrolled, setIsScrolled] = useState(false);
  const handleScroll = (e) => {
    if (e.target.scrollTop > 130) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  // Fetching food data filtered by restaurant name
  useEffect(() => {
    setLoading(true);
    axios.get(`/restaurant?name=${pathname}`).then((res) => {
      setFood(res.data);
      setLoading(false);
    });
  }, [axios, pathname]);

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

  // Handle Modal Open
  const [open, setOpen] = useState(false);
  const handleOpen = (items) => {
    setOpen(!open);
    setDetails(items);
  };

  // Handle Save data to local storage
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  let totalPrice = quantity * details?.price;

  // Handling fetching food reviews
  const [foodReviews, setFoodReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);

  useEffect(() => {
    if (details && details._id) {
      setLoadingReviews(true);
      axios.get(`/reviews/foods?id=${details._id}`).then((res) => {
        setFoodReviews(res.data);
        setLoadingReviews(false);
      });
    }
  }, [details, axios]);

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
      identifier: details._id,
      name: details?.name,
      image: details?.image,
      price: details?.price,
      status: "order received",
      date: formattedDate,
      quantity: quantity,
      totalPrice: totalPrice,
      restaurant: pathname,
      isAcceptedByRider: false,
      orderId: generateRandomString(),
    };

    const existingItemIndex = existingCart.findIndex(
      (item) => item.identifier === details?._id
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

    toast.success(`${details?.name} added to cart!`, {
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
    setOpen();
  };

  useEffect(() => {
    if (!open) {
      setQuantity(1);
      setIsScrolled(false);
      setOpen(false);
    }
  }, [open]);

  return (
    <div>
      {loading ? (
        <RestaurantPageSkeletonLoader pathname={pathname} />
      ) : (
        <>
          {/* Banner */}
          <div
            className="h-[200px] flex justify-center items-center text-[40px] md:ext-[50px] lg:ext-[50px] restaurantTitle"
            style={{
              backgroundImage: `url("https://i.ibb.co/YNFfVNq/res-bg.png")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "100% 100%",
            }}
          >
            {pathname}
          </div>

          {/* Main */}
          <div className="bg-[#eff6f3]">
            <div className="w-[80%] mx-auto">
              {/* Title */}
              <div
                className={`secHeader py-10 flex items-center gap-3 text-red-500 ${
                  food.length <= 0 && "hidden"
                }`}
              >
                <AiFillFire className="text-[24px] " />
                <h3 className="text-[#333333] text-[24px] font-bold">
                  Featured from {pathname}
                </h3>
              </div>

              {/* Cards */}
              {food.length === 0 ? (
                <NoFoodsFound restaurantName={pathname} />
              ) : (
                <>
                  <div className="resCards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
                    {food.map((item, index) => (
                      <div key={index}>
                        <button
                          onClick={() => handleOpen(item)}
                          className="bg-white flex gap-5 items-center w-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                        >
                          <div className="foodContent w-2/3 flex flex-col gap-2">
                            <h1 className="FoodTitle elipseTitle text-[#333333] text-[22px] font-bold">
                              {item?.name}
                            </h1>
                            <p className="elipseDesc text-[#767676] text-[15px]">
                              {item?.description}
                            </p>
                            <p className="text-[#333333] text-[22px] font-bold">
                              ৳ {item?.price}
                            </p>
                          </div>

                          <div className="foodImage-rc w-1/3">
                            <img
                              src={item?.image}
                              className="rounded-xl h-[120px] w-full"
                            />
                          </div>
                        </button>
                      </div>
                    ))}

                    {/* Modal fo details of food */}
                    <Dialog open={open} handler={handleOpen}>
                      <div
                        onScroll={handleScroll}
                        className="h-[400px] md:h-[400px] lg:h-[600px] overflow-auto rounded-lg flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex">
                            <img
                              src={details?.image}
                              className="mx-auto h-[300px] w-full"
                            />

                            {/* conditional display */}
                            <div
                              className={`absolute transition-all duration-300 ${
                                isScrolled
                                  ? "bg-white shadow-2xl"
                                  : "bg-transparent"
                              } w-full rounded-t-lg p-3 flex gap-2 justify-between`}
                            >
                              <h1
                                className={`${
                                  !isScrolled && "invisible"
                                } text-lg text-black flex items-center`}
                              >
                                {details?.name}
                              </h1>

                              <button
                                onClick={() => setOpen(!open)}
                                className={`h-8 w-8 mr-5 mt-2 rounded-full ${
                                  !isScrolled
                                    ? "bg-white"
                                    : "border-2 border-gray-800"
                                } text-xl text-red-600 font-bold`}
                              >
                                X
                              </button>
                            </div>
                          </div>

                          <h1 className="text-[#333333] font-bold text-center text-[30px] mt-4 px-4">
                            {details?.name}
                          </h1>

                          <p className="text-[#767676] text-[18px] text-left px-4">
                            {details?.description}
                          </p>

                          {/* reviews */}
                          <div className="reviews">
                            <h2 className="flex flex-row flex-nowrap items-center py-10">
                              <span className="flex-grow block border-t border-blue-600 ml-[30px]"></span>
                              <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-blue-500 text-white">
                                Reviews
                              </span>
                              <span className="flex-grow block border-t border-blue-600 mr-[30px]"></span>
                            </h2>

                            <div>
                              {foodReviews.length === 0 ? (
                                <div>
                                  <div className="w-full mb-5">
                                    <div
                                      className="bg-gray-300 w-[100px] h-[100px] mx-auto flex justify-center items-center p-3 rounded-full shadow-lg shadow-blue-500
                                "
                                    >
                                      <img
                                        src="https://i.ibb.co/YPNn9WM/reviews.png"
                                        className="w-[60px]"
                                      />
                                    </div>

                                    <h1 className="text-center mt-8 text-2xl text-gray-700">
                                      No reviews for this food yet!!
                                    </h1>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  <div className="flex flex-col gap-3">
                                    {loadingReviews ? (
                                      <>
                                        <ReviewsSkeletonLoader />
                                      </>
                                    ) : (
                                      <>
                                        {foodReviews.map((item, index) => (
                                          <div
                                            key={index}
                                            className={`w-[90%] mx-auto flex flex-col gap-4 bg-gray-900 text-gray-400 p-4 rounded-lg`}
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
                                      </>
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Position Fixed */}
                        <div className="sticky bottom-0 p-3 z-20 bg-white">
                          <div className="flex my-6">
                            <p className="text-[#333333] text-[22px] font-bold">
                              Tk {details?.price}
                            </p>
                          </div>

                          <div className="addToCartPart mt-5 flex gap-5 justify-center items-center">
                            <div className="flex flex-row gap-3">
                              <AiFillMinusCircle
                                className="text-pink-500 text-[30px] cursor-pointer"
                                onClick={handleDecreaseQuantity}
                              />
                              <p className="text-[20px] font-bold">
                                {quantity}
                              </p>
                              <AiFillPlusCircle
                                className="text-pink-500 text-[30px] cursor-pointer"
                                onClick={handleIncreaseQuantity}
                              />
                            </div>
                            {user ? (
                              <Button
                                fullWidth
                                className="bg-indigo-600 hover:bg-indigo-800"
                                onClick={handleAddToCart}
                              >
                                Add To Cart
                              </Button>
                            ) : (
                              <Link to="/sign-in" state={location?.pathname}>
                                <Button
                                  className="bg-indigo-600 hover:bg-indigo-800"
                                  onClick={handleShowAlert}
                                >
                                  Add To Cart
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </Dialog>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantPage;
