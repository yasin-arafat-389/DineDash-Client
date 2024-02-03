import {
  MdCancel,
  MdDeliveryDining,
  MdOutlineCallReceived,
} from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import NoOrders from "./NoOrders";
import { GridLoader } from "react-spinners";
import { PiCookingPotFill } from "react-icons/pi";
import { FaCheckCircle } from "react-icons/fa";

const CustomMadeBurgers = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      let res = await axios.get(`/my-orders?email=${user?.email}`).then();
      return res.data;
    },
  });

  let burgers = [];
  myOrders.forEach((item) => {
    burgers.push(...item.burger);
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-[100px]">
        <GridLoader color="#36d7b7" size={40} />
      </div>
    );
  }

  return (
    <div>
      {burgers?.length === 0 ? (
        <NoOrders
          title="You have no orders yet!!"
          buttonText="Create your own burger"
          route="/burger-builder"
        />
      ) : (
        burgers?.map((item, index) => (
          <div
            className="order-details bg-white w-[90%] shadow-lg rounded-lg mx-auto mt-5"
            key={index}
          >
            <div className="details-header rounded-lg bg-white p-4">
              <h1>
                <span className="text-lg">Order</span>{" "}
                <span className="text-blue-600">#{item.orderId}</span>
              </h1>
              <p className="text-gray-600 text-sm">placed on {item.date}</p>
            </div>

            <div className="separator h-[2px] bg-gray-300 "></div>

            <div className="details mt-3 p-4 flex flex-col md:flex-col lg:flex-row justify-between">
              <div className="imgAndTitle flex gap-5 items-center">
                <img
                  src="https://promptsideas.b-cdn.net/prompts/1273/G5mkQ72DKdLzGbDJXCkK.png"
                  className="w-[150px] h-[100px] rounded-md object-cover"
                />
                <h1 className="title text-lg">Custom Made Burger</h1>
              </div>

              <div>
                <h1 className="flex flex-col gap-3 justify-center items-center">
                  <span className="text-[16px] text-blue-400 font-bold">
                    Price
                  </span>
                  <span>৳ {item.totalPrice}</span>
                </h1>
              </div>

              <div>
                <h1 className="flex flex-col gap-3 justify-center items-center">
                  <span className="text-[16px] text-blue-400 font-bold">
                    Restaurant
                  </span>
                  <span>{item.provider}</span>
                </h1>
              </div>

              <div className="flex flex-col gap-3 items-center">
                <span className="text-[16px] text-blue-400 font-bold">
                  Status
                </span>
                <div
                  className={`custom-chip text-base font-bold p-2 rounded-lg capitalize flex justify-center items-center gap-2 ${
                    item.status === "order received" &&
                    "bg-brown-500 text-white"
                  } ${
                    item.status === "cooking" && "bg-indigo-500 text-white"
                  } ${
                    item.status === "out for delivery" &&
                    "bg-teal-500 text-white"
                  } ${
                    item.status === "completed" && "bg-green-500 text-white"
                  } ${item.status === "cancelled" && "bg-red-500 text-white"}`}
                >
                  {item.status === "order received" && (
                    <MdOutlineCallReceived size={"20"} />
                  )}
                  {item.status === "cooking" && (
                    <PiCookingPotFill size={"30"} />
                  )}
                  {item.status === "out for delivery" && (
                    <MdDeliveryDining size={"30"} />
                  )}
                  {item.status === "completed" && <FaCheckCircle size={"20"} />}
                  {item.status === "cancelled" && <MdCancel size={"20"} />}
                  <span>{item.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomMadeBurgers;
