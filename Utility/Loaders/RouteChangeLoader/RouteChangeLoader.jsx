import Lottie from "lottie-react";
import RouteChangeLoaderAnimation from "../../../src/Assets/RouteChangeLoader.json";

const RouteChangeLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Lottie animationData={RouteChangeLoaderAnimation} loop={true} />
    </div>
  );
};

export default RouteChangeLoader;
