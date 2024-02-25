import { Outlet } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <>
      <div className="bg-[#FFF5E6] h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default OrderSuccess;
