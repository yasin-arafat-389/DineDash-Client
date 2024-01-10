/* eslint-disable react/prop-types */
import noFoodFound from "./no-food.png";

const NoFoodsFound = ({ restaurantName }) => {
  return (
    <div>
      <div className="text-center py-10">
        <img src={noFoodFound} className="mx-auto" />
        <h1 className="mt-5 text-3xl italic text-gray-600">
          No Foods Found From{" "}
          <span className="font-bold bg-yellow-500 p-2 rounded-lg text-blue-600">
            {restaurantName}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default NoFoodsFound;
