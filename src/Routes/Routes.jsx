import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import BurgerBuilder from "../Pages/BurgerBuilder/BurgerBuilder";
import CheckOut from "../Pages/CheckOut/CheckOut";
import RestaurantPage from "../Pages/RestaurantPage/RestaurantPage";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";

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
        path: "/cart",
        element: <CheckOut />,
      },
      {
        path: "/restaurants/:name",
        element: <RestaurantPage />,
      },
    ],
  },
]);

export default router;
