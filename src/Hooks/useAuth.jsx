import { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
