/* eslint-disable react/prop-types */
const RestaurantPageSkeletonLoader = ({ pathname }) => {
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

      <div
        className="h-[100px] md:h-[200px] flex justify-center items-center text-[40px] md:text-[50px] lg:ext-[50px] restaurantTitle"
        style={{
          backgroundImage: `url("https://i.ibb.co/YNFfVNq/res-bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        }}
      >
        {pathname}
      </div>

      <div>
        <div className="bg-[#eff6f3]">
          <div className="w-[80%] mx-auto">
            <div className="secHeader py-10 flex items-center gap-3 text-red-500 false">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 1024 1024"
                className="text-[24px] "
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M834.1 469.2A347.49 347.49 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8-1.4 1.5-3 1.9-4.1 2-1.1.1-2.8-.1-4.3-1.5-1.4-1.2-2.1-3-2-4.8 3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9-11 29.5-26.8 56.9-47 81.5a295.64 295.64 0 0 1-47.5 46.1 352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9z"></path>
              </svg>
              <h1 className="h-6 w-1/3 rounded-lg bg-gray-400 animate-pulse"></h1>
            </div>
            <div className="resCards grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
              {[1, 2, 3, 4, 5, 6].map((item, index) => (
                <div
                  key={index}
                  className="bg-white flex gap-5 items-center w-full text-left border-2 border-gray-400 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="foodContent w-2/3 flex flex-col gap-2">
                    <h1 className="h-5 w-full rounded-lg bg-gray-400 animate-pulse"></h1>
                    <h1 className="h-12 w-full rounded-lg bg-gray-400 animate-pulse"></h1>
                    <h1 className="h-5 w-[70px] rounded-lg bg-gray-400 animate-pulse"></h1>
                  </div>
                  <div className="foodImage-rc w-1/3">
                    <h1 className="rounded-xl h-[120px] w-full bg-gray-400 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantPageSkeletonLoader;
