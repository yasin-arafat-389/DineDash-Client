import { FaCheckCircle } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";

const SuccessPage = () => {
  const { redirectTo } = useParams();

  console.log(redirectTo);

  return (
    <div>
      <div className="bg-gray-100">
        <div className="bg-white p-6  md:mx-auto mt-[10%]">
          <FaCheckCircle className="text-[70px] my-5 text-green-600 mx-auto" />
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
