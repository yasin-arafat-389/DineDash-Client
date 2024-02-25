/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { closeDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const open = useSelector((state) => state.cartDrawer.open);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <div>
      <Drawer
        overlay={false}
        placement="right"
        open={open}
        className="p-4 shadow-2xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            My Cart
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            className="bg-gray-200"
            onClick={handleCloseDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        {/* Cart Contents */}
        <div className="overflow-auto h-full">
          <div></div>
        </div>

        <div className="fixed bottom-0 pt-5 pb-2 w-[275px] bg-white">
          <Button
            onClick={() => {
              navigate("/checkout");
              dispatch(closeDrawer());
            }}
            fullWidth
            className="bg-[#0866ff] capitalize text-[15px]"
          >
            Go to checkout
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default CartDrawer;
