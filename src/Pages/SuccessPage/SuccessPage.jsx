import { Link, useParams } from "react-router-dom";
import successPageAnimation from "./SuccessAnimation.json";
import Lottie from "lottie-react";

const SuccessPage = () => {
  const { redirectTo } = useParams();

  return (
    <div>
      <div>
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="w-[20%] mx-auto">
            <Lottie animationData={successPageAnimation} />
          </div>

          <div className="text-center">
            <h3 className="md:text-3xl text-base text-gray-900 font-semibold text-center">
              Order has been placed successfully!
            </h3>
            <p className="text-gray-600 font-bold my-2">
              Please check your email. You should get an invoice of your order.
            </p>
            <p className="text-gray-600 text-lg"> Have a great day! 😊 </p>
            <div className="py-10 text-center">
              <Link
                to={
                  redirectTo === "myOrders"
                    ? "/my-orders"
                    : "/custom-made-burgers"
                }
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO TO MY ORDERS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
