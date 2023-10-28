import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../../Utility/ScrollToTop/ScrollToTop";

const MainLayout = () => {
  return (
    <div>
      <ScrollToTop />
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="dark"
      />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
