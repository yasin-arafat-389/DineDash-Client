import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import BurgerBuilder from "../Pages/BurgerBuilder/BurgerBuilder";
import CheckOut from "../Pages/CheckOut/CheckOut";
import RestaurantPage from "../Pages/RestaurantPage/RestaurantPage";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import BrowseFoods from "../Pages/BrowseFoods/BrowseFoods";
import MyProfile from "../Pages/MyProfile/MyProfile";
import MyOrders from "../Pages/MyOrders/MyOrders";
import RegularOrders from "../Pages/MyOrders/RegularOrders";
import CustomMadeBurgers from "../Pages/MyOrders/CustomMadeBurgers";
import OrderSuccess from "../Pages/OrderSuccess/OrderSuccess";
import PaymentCancelled from "../Pages/PaymenCancelled/PaymentCancelled";
import SuccessPage from "../Pages/SuccessPage/SuccessPage";
import BePartner from "../Pages/BePartner/BePartner";
import PartnerRequest from "../Pages/PartnerRequest/PartnerRequest";
import BeRider from "../Pages/BeRider/BeRider";
import RiderRequest from "../Pages/RiderRequest/RiderRequest";
import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import FoodDetails from "../Pages/BrowseFoods/FoodDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/sign-up",
        element: <Registration />,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/burger-builder",
        element: <BurgerBuilder />,
      },
      {
        path: "/browse-foods",
        element: <BrowseFoods />,
      },
      {
        path: "/food-details/:id",
        element: <FoodDetails />,
      },
      {
        path: "/restaurants/:name",
        element: <RestaurantPage />,
      },
      {
        path: "/be-a-partner",
        element: <BePartner />,
      },
      {
        path: "/be-a-rider",
        element: <BeRider />,
      },
      {
        path: "/partner-request",
        element: (
          <PrivateRoute>
            <PartnerRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/rider-request",
        element: (
          <PrivateRoute>
            <RiderRequest />
          </PrivateRoute>
        ),
      },

      // -------------------------- Use profile menus --------------------------
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
    ],
  },

  // -------------------------- Order success/failed, email verification message layout --------------------------
  {
    path: "/",
    element: <OrderSuccess />,
    children: [
      {
        path: "/order-success/:redirectTo",
        element: <SuccessPage />,
      },
      {
        path: "/payment-cancelled",
        element: <PaymentCancelled />,
      },
      {
        path: "/verify-email/:verificationCode",
        element: <VerifyEmail />,
      },
    ],
  },

  // -------------------------- My Orders layout --------------------------

  {
    path: "/",
    element: (
      <PrivateRoute>
        <MyOrders />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <RegularOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "/custom-made-burgers",
        element: (
          <PrivateRoute>
            <CustomMadeBurgers />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
