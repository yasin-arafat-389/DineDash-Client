/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const NoOrders = ({ title, route, buttonText }) => {
  let navigate = useNavigate();

  return (
    <div className="my-10">
      <div className="flex flex-col justify-center items-center">
        <img
          src="https://i.ibb.co/cy5395Z/empty-cart.png"
          className="w-[100px]"
        />

        <h1 className="text-2xl md:text-4xl font-bold my-5 italic text-deep-orange-200">
          {title}
        </h1>

        <Button
          onClick={() => navigate(route)}
          className="capitalize text-lg mt-5"
          color="blue"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default NoOrders;
