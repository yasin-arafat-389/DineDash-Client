import { Button } from "@material-tailwind/react";
import noDataFoundImage from "./no-result-found.png";

const NoDataFound = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col">
        <img src={noDataFoundImage} className="w-[50%]" />
        <Button
          onClick={() => window.location.reload()}
          className="capitalize text-lg mt-5"
          color="blue"
        >
          Browse All Food
        </Button>
      </div>
    </div>
  );
};

export default NoDataFound;
