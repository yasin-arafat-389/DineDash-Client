import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import BurgerBuilder from "../Pages/BurgerBuilder/BurgerBuilder";
import CheckOut from "../Pages/CheckOut/CheckOut";

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
        path: "/burger-builder",
        element: <BurgerBuilder />,
      },
      {
        path: "/cart",
        element: <CheckOut />,
      },
    ],
  },
]);

export default router;
