import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
