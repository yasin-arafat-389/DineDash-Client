import {
  Button,
  Chip,
  Dialog,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { FcSearch } from "react-icons/fc";
import useAxios from "../../Hooks/useAxios";
import { useState } from "react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const BrowseFoods = () => {
  let axios = useAxios();

  // States
  const [details, setDetails] = useState();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);

  let { user } = useAuth();

  const handleOpen = (items) => {
    setOpen(!open);
    setDetails(items);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  let totalPrice = quantity * details?.price;

  let { data } = useQuery({
    queryKey: ["allFoods", page],
    queryFn: async () => {
      let res = await axios.get(`/foods/pagination?page=${page}`).then();
      return res.data;
    },
  });

  if (!data?.foodCounts) return;

  const totalPages = Math.ceil(data?.foodCounts / 6);
  const pages = [...new Array(totalPages).fill(0)];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleAddToCart = () => {
    const existingCart =
      JSON.parse(localStorage.getItem(`${user?.email}Cart`)) || [];

    let saveToLocalStorage = {
      id: details?._id,
      user: user?.email,
      name: details?.name,
      image: details?.image,
      price: details?.price,
      quantity: quantity,
      totalPrice: totalPrice,
      restaurant: details?.restaurant,
    };

    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === details?._id
    );

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
      existingCart[existingItemIndex].totalPrice +=
        saveToLocalStorage.totalPrice;
    } else {
      existingCart.push(saveToLocalStorage);
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

  return (
    <>
      <div>
        <div
          className="h-[200px] flex justify-center items-center text-[40px] md:ext-[50px] lg:ext-[50px] restaurantTitle"
          style={{
            backgroundImage: `url("https://i.ibb.co/YNFfVNq/res-bg.png")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          Browse Foods
        </div>

        <div className="bg-[#eff6f3]">
          <div className="flex flex-col w-[90%] mx-auto py-20 gap-3">
            {/* Filters */}
            <div className="foodItems w-full grid grid-cols-2 gap-10">
              {/* filter by category */}
              <Select color="blue" label="Filter by category">
                <Option>Burger</Option>
                <Option>Chicken</Option>
                <Option>Side</Option>
                <Option>Vegetarian</Option>
                <Option>Pizza</Option>
                <Option>Pasta</Option>
                <Option>Appetizer</Option>
              </Select>

              {/* Search bar */}
              <div className="flex gap-4">
                <Input
                  label="Search your favourite food"
                  icon={<FcSearch className="cursor-pointer text-[20px]" />}
                />
              </div>
            </div>

            <div className="foodItems w-full mt-10">
              <div className="resCards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
                {data?.result?.map((item, index) => (
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
                          className="rounded-xl h-[120px]"
                        />
                      </div>
                    </button>
                  </div>
                ))}

                {/* Modal fo details of food */}
                <Dialog open={open} handler={handleOpen}>
                  <div className="p-5">
                    <img
                      src={details?.image}
                      className="rounded-lg mx-auto h-[300px] w-full"
                    />

                    <h1 className="text-[#333333] font-bold text-[30px] mt-4 text-center">
                      {details?.name}
                    </h1>

                    <p className="text-[#767676] text-[18px] text-center">
                      {details?.description}
                    </p>

                    <div className="flex justify-between my-6">
                      <p className="text-[#333333] text-[22px] font-bold">
                        ৳ {details?.price}
                      </p>
                      <Chip
                        className="bg-[#0866ff]"
                        value={details?.restaurant}
                      />
                    </div>

                    <div className="addToCartPart mt-5 flex gap-5 justify-center items-center">
                      <div className="flex flex-row gap-3">
                        <AiFillMinusCircle
                          className="text-pink-500 text-[30px] cursor-pointer"
                          onClick={handleDecreaseQuantity}
                        />
                        <p className="text-[20px] font-bold">{quantity}</p>
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
                </Dialog>
              </div>
              {/* Pagination */}

              <div className="flex items-center justify-center gap-3">
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={() => handlePageChange(Math.max(page - 1, 0))}
                  disabled={page === 0}
                >
                  <FaArrowLeft strokeWidth={2} className="h-4 w-4" />
                  Previous
                </Button>
                {pages.map((item, index) => (
                  <button
                    key={index}
                    className={` px-3 py-1 font-bold text-[18px] hover:bg-[#2121211a] rounded-lg ${
                      page === index
                        ? "bg-black text-white rounded-lg hover:bg-black"
                        : "bg-transparent"
                    }`}
                    onClick={() => setPage(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <Button
                  variant="text"
                  className="flex items-center gap-2"
                  onClick={() =>
                    handlePageChange(Math.min(page + 1, totalPages - 1))
                  }
                  disabled={page === totalPages - 1}
                >
                  Next
                  <FaArrowRight strokeWidth={2} className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrowseFoods;
