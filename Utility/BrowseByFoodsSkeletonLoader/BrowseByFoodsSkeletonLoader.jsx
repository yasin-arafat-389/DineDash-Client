import { Input } from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";

const BrowseByFoodsSkeletonLoader = () => {
  return (
    <div className="bg-[#eff6f3]">
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

      <div className="w-[90%] mx-auto py-20">
        <div className="my-5 mb-10 w-full grid grid-cols-2 gap-10">
          <select>
            <option className="">Loading categories</option>
          </select>

          <Input
            color="black"
            placeholder="Search Food"
            className="!border-black !border-2 !text-[#000] !font-bold placeholder:text-gray-600 placeholder:font-bold"
            icon={
              <button>
                <IoSearch className="text-[20px] text-[#000]" />
              </button>
            }
          />
        </div>
        <div className="foodItems w-full grid grid-cols-2 gap-10">
          {[1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="bg-white flex gap-5 items-center w-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="foodContent w-2/3 flex flex-col gap-2">
                <h1 className="h-5 w-full rounded-lg bg-gray-400 animate-pulse"></h1>
                <h1 className="h-14 w-full rounded-lg bg-gray-400 animate-pulse"></h1>
                <h1 className="h-5 w-[30px] rounded-lg bg-gray-400 animate-pulse"></h1>
              </div>
              <div className="foodImage-rc w-1/3">
                <h1 className="rounded-xl h-[120px] w-full bg-gray-400 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseByFoodsSkeletonLoader;
