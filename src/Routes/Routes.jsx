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
        path: "/restaurants/:name",
        element: <RestaurantPage />,
      },

      // -------------------------- Use profile menus --------------------------
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />,
          </PrivateRoute>
        ),
      },
      {
        path: "/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />,
          </PrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CheckOut />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
