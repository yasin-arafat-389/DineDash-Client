import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../../Utility/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
