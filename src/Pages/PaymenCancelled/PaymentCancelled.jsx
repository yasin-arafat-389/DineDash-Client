import Lottie from "lottie-react";
import paymentCancelledAnimation from "./paymentCancelledAnimation.json";
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="p-6 md:mx-auto">
          <div className="w-[25%] mx-auto my-4">
            <Lottie animationData={paymentCancelledAnimation} />
          </div>
          <div className="text-center">
            <h3 className="md:text-3xl text-base text-gray-900 font-semibold text-center">
              Your payment has been cancelled!
            </h3>

            <div className="py-10 text-center">
              <Link
                to="/"
                className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
              >
                GO TO HOME PAGE
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
