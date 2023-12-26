import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import RouteChangeLoader from "../../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";
import { MdOutlineCallReceived } from "react-icons/md";
import { Chip } from "@material-tailwind/react";
import NoOrders from "./NoOrders";

const RegularOrders = () => {
  let { user } = useAuth();
  let axios = useAxios();

  let { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["myAllOrders"],
    queryFn: async () => {
      let res = await axios.get(`/my-orders?email=${user?.email}`).then();
      return res.data;
    },
  });

  if (isLoading) {
    return <RouteChangeLoader />;
  }

  console.log(myOrders);

  return (
    <div>
      <div>
        {myOrders.length === 0 ? (
          <>
            <NoOrders title="You have no orders yet!!" route="/browse-foods" />
          </>
        ) : (
          ""
        )}

        {myOrders?.map((items) =>
          items.cartFood?.map((item, index) => (
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
                    src={item.image}
                    className="w-[150px] h-[100px] rounded-md object-cover"
                  />
                  <h1 className="title text-lg">{item.name}</h1>
                </div>

                <div>
                  <h1 className="flex flex-col gap-3 justify-center items-center">
                    <span className="text-[16px] text-blue-400 font-bold">
                      Quantity
                    </span>
                    <span>{item.quantity}</span>
                  </h1>
                </div>

                <div>
                  <h1 className="flex flex-col gap-3 justify-center items-center">
                    <span className="text-[16px] text-blue-400 font-bold">
                      Price
                    </span>
                    <span>৳ {item.totalPrice}.00</span>
                  </h1>
                </div>

                <div>
                  <h1 className="flex flex-col gap-3 justify-center items-center">
                    <span className="text-[16px] text-blue-400 font-bold">
                      Restaurant
                    </span>
                    <span>{item.restaurant}</span>
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
    </div>
  );
};

export default RegularOrders;
