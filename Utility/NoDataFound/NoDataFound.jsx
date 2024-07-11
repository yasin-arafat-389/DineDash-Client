/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import noSearchResultAnimation from "./noSearchResult.json";
import Lottie from "lottie-react";

const NoDataFound = ({ searchInput }) => {
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      <div className="flex flex-col gap-20">
        <div>
          <Lottie animationData={noSearchResultAnimation} />
        </div>

        <h1 className="mt-10 text-center text-3xl font-bold text-gray-700">
          No Result Found for{" "}
          <span className="bg-yellow-500 px-1">{searchInput}</span>
        </h1>
      </div>
      <Button
        onClick={() => window.location.reload()}
        className="capitalize text-lg mt-5"
        color="blue"
      >
        Browse All Food
      </Button>
    </div>
  );
};

export default NoDataFound;
