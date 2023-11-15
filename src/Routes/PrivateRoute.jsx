/* eslint-disable react/prop-types */
import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import RouteChangeLoader from "../../Utility/Loaders/RouteChangeLoader/RouteChangeLoader";
import toast from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  let location = useLocation();

  if (loading) return <RouteChangeLoader />;

  if (!user) {
    toast.error(`You must login first!`, {
      style: {
        border: "2px solid red",
        padding: "8px",
        color: "#713200",
      },
      iconTheme: {
        primary: "red",
        secondary: "#FFFAEE",
      },
    });
    return <Navigate state={location.pathname} to="/sign-in" replace={true} />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
