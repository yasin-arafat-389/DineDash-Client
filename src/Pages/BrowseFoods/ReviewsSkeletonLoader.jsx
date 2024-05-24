const ReviewsSkeletonLoader = () => {
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

      {[1, 2].map((item, index) => (
        <div
          key={index}
          className={`w-full mt-7 mx-auto flex flex-col gap-4 bg-gray-900 text-gray-400 p-4 rounded-lg mb-5`}
        >
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-10 h-10 text-center object-cover rounded-full bg-gray-500 animate-pulse`}
              ></div>

              <h1 className="h-5 w-[100px] rounded-lg bg-gray-400 animate-pulse"></h1>
            </div>

            <h1 className="h-5 w-[100px] rounded-lg bg-gray-400 animate-pulse"></h1>
          </div>

          <h1 className="h-20 rounded-lg bg-gray-400 animate-pulse"></h1>
        </div>
      ))}
    </div>
  );
};

export default ReviewsSkeletonLoader;
