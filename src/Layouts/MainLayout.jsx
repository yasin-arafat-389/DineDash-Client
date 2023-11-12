import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../../Utility/ScrollToTop/ScrollToTop";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
