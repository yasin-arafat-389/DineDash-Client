import { Outlet } from "react-router-dom";
import NavBar from "../Components/Navbar/NavBar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../../Utility/ScrollToTop/ScrollToTop";
import CartDrawer from "../Components/CartDrawer/CartDrawer";
import { useDispatch } from "react-redux";
import { closeDrawer } from "../Redux/CartDrawerSlice/CartDrawerSlice";
import { useSelector } from "react-redux";
import NavDrawer from "../Components/NavDrawer/NavDrawer";
import { closeNavDrawer } from "../Redux/NavDrawerSlice/NavDrawerSlice";
import { useEffect } from "react";

const MainLayout = () => {
  const navDrawerOpen = useSelector((state) => state.navDrawer.open);
  const cartDrawerOpen = useSelector((state) => state.cartDrawer.open);
  const dispatch = useDispatch();

  const handleCloseDrawer = () => {
    dispatch(closeDrawer());
    dispatch(closeNavDrawer());
  };

  useEffect(() => {
    if (cartDrawerOpen) {
      setTimeout(() => {
        const overlay = document.querySelector(".overlayOnDrawerOpen");
        if (overlay) {
          overlay.classList.add("show");
        }
      }, 5);
    } else if (navDrawerOpen) {
      setTimeout(() => {
        const overlay = document.querySelector(".overlayOnNavDrawerOpen");
        if (overlay) {
          overlay.classList.add("show");
        }
      }, 5);
    }
  }, [cartDrawerOpen, navDrawerOpen]);

  return (
    <div>
      <ScrollToTop />
      <NavBar />

      <CartDrawer />
      {cartDrawerOpen && (
        <div className="overlayOnDrawerOpen" onClick={handleCloseDrawer} />
      )}

      <NavDrawer />
      {navDrawerOpen && (
        <div className="overlayOnNavDrawerOpen" onClick={handleCloseDrawer} />
      )}

      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
