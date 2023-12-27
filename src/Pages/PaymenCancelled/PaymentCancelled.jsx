import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div>
      <div className="bg-gray-100">
        <div className="bg-white p-6  md:mx-auto mt-[10%]">
          <MdCancel className="text-[70px] my-5 text-red-600 mx-auto" />
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
