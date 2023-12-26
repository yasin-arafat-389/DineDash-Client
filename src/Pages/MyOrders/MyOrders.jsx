import { useState } from "react";
import RegularOrders from "./RegularOrders";
import CustomMadeBurgers from "./CustomMadeBurgers";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="bg-[#EFF0F4] pb-10">
        <h2 className="flex flex-row flex-nowrap items-center py-10">
          <span className="flex-grow block border-t border-black ml-[100px]"></span>
          <span className="flex-none block mx-4 px-4 py-2.5 text-xl rounded leading-none font-medium bg-black text-white">
            Your Orders
          </span>
          <span className="flex-grow block border-t border-black mr-[100px]"></span>
        </h2>

        <div>
          <div className="w-[60%] mx-auto grid grid-cols-2 gap-5">
            <button
              className={`p-4 rounded ${
                activeTab === "tab1"
                  ? "bg-indigo-500 text-white font-bold shadow-md"
                  : "bg-gray-400 text-[#000] font-bold"
              } flex items-center justify-center`}
              onClick={() => handleTabClick("tab1")}
            >
              Regular Orders
            </button>
            <button
              className={`p-4 rounded ${
                activeTab === "tab2"
                  ? "bg-indigo-500 text-white font-bold shadow-md"
                  : "bg-gray-400 text-[#000] font-bold"
              } flex items-center justify-center`}
              onClick={() => handleTabClick("tab2")}
            >
              Custom Made Burgers
            </button>
          </div>
        </div>

        {activeTab === "tab1" && <RegularOrders />}
        {activeTab === "tab2" && <CustomMadeBurgers />}
      </div>
    </div>
  );
};

export default MyOrders;
