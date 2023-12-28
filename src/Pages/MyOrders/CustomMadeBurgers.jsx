import { Chip } from "@material-tailwind/react";
import { MdOutlineCallReceived } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";
import NoOrders from "./NoOrders";

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
    return <RouteChangeLoader />;
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

              <div className="flex justify-center items-center">
                <Chip
                  className={`capitalize text-[15px] ${
                    item.status === "order received" ? "bg-gray-500" : ""
                  }`}
                  value={item.status}
                  icon={<MdOutlineCallReceived className="text-xl" />}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CustomMadeBurgers;
