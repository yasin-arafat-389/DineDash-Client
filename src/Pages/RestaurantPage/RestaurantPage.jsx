import useAxios from "../../Hooks/useAxios";
import { useParams } from "react-router-dom";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";
import "./RestaurantPage.css";
import { AiFillFire } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button, Dialog } from "@material-tailwind/react";
import { AiFillMinusCircle } from "react-icons/ai";
import { AiFillPlusCircle } from "react-icons/ai";

const RestaurantPage = () => {
  let restaurantPath = useParams();
  let pathname = restaurantPath.name;
  let axios = useAxios();

  // States
  const [loading, setLoading] = useState(false);
  const [food, setFood] = useState([]);
  const [details, setDetails] = useState();

  // Fetching food data filtered by restaurant name
  useEffect(() => {
    setLoading(true);
    axios.get(`/restaurant?name=${pathname}`).then((res) => {
      setFood(res.data);
      setLoading(false);
    });
  }, [axios, pathname]);

  // Handle Modal Open
  const [open, setOpen] = useState(false);
  const handleOpen = (items) => {
    setOpen(!open);
    setDetails(items);
  };

  return (
    <div>
      {loading ? (
        <RouteChangeLoader />
      ) : (
        <>
          {/* Banner */}
          <div
            className="h-[200px] flex justify-center items-center text-[50px] restaurantTitle"
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
              <div className="secHeader py-10 flex items-center gap-3 text-red-500">
                <AiFillFire className="text-[24px] " />
                <h3 className="text-[#333333] text-[24px] font-bold">
                  Featured from {pathname}
                </h3>
              </div>

              {/* Cards */}
              <div className="resCards grid grid-cols-2 gap-10 pb-16">
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
                          className="rounded-xl h-[120px]"
                        />
                      </div>
                    </button>
                  </div>
                ))}

                {/* Modal fo details of food */}
                <Dialog open={open} handler={handleOpen}>
                  <div className="p-5">
                    <img src={details?.image} className="rounded-lg" />

                    <h1 className="text-[#333333] font-bold text-[30px] mt-4 text-center">
                      {details?.name}
                    </h1>

                    <p className="text-[#767676] text-[18px] text-center">
                      {details?.description}
                    </p>

                    <h1 className="text-[#333333] font-bold text-[30px] mt-4">
                      ৳ {details?.price}
                    </h1>

                    <div className="addToCartPart mt-5 flex gap-5 justify-center items-center">
                      <div className="flex flex-row gap-3">
                        <AiFillMinusCircle className="text-pink-500 text-[30px] cursor-pointer" />
                        <p className="text-[20px] font-bold">1</p>
                        <AiFillPlusCircle className="text-pink-500 text-[30px] cursor-pointer" />
                      </div>
                      <Button
                        fullWidth
                        className="bg-indigo-600 hover:bg-indigo-800"
                      >
                        Add To Cart
                      </Button>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RestaurantPage;
