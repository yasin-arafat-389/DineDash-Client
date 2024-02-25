import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../../Utility/ScrollToTop/ScrollToTop";
import CartDrawer from "../Components/CartDrawer/CartDrawer";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../Redux/CartDrawerSlice/CartDrawerSlice";
import { useSelector } from "react-redux";

const MainLayout = () => {
  const cartDrawerOpen = useSelector((state) => state.cartDrawer.open);
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
  };

  return (
    <div>
      <ScrollToTop />
      <NavBar />
      <CartDrawer />
      {cartDrawerOpen && (
        <div className="overlayOnDrawerOpen" onClick={handleCloseDrawer} />
      )}
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
