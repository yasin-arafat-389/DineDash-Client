/* eslint-disable react/prop-types */
import React from "react";
import "./NavBar.css";
import {
  Menu,
  MenuList,
  Card,
  IconButton,
  Collapse,
  MenuHandler,
  Badge,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// Icons
import { GiHamburgerMenu } from "react-icons/gi";
import { HiRocketLaunch } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { toggleDrawer } from "../../Redux/CartDrawerSlice/CartDrawerSlice";
import { openNavDrawer } from "../../Redux/NavDrawerSlice/NavDrawerSlice";
import { motion } from "framer-motion";

function MyProfileMenu() {
  let { user } = useAuth();

  return (
    <div>
      {user ? (
        <ProfileMenu />
      ) : (
        <Link to="/sign-in">
          <button className="loginBTN">
            <BiLogInCircle className="text-[20px]" />
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
}

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <HiRocketLaunch strokeWidth={1} className="h-28 w-28" />
          </Card>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

function NavList({ closeCollapse }) {
  let { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  let count = useSelector((state) => state.cartCount.count);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleOpenDrawer = () => {
    if (!user) {
      navigate("/sign-in");
      toast.error(`You must login first!!`, {
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
      return;
    }
    dispatch(toggleDrawer());
  };

  return (
    <>
      <ul className="mb-4 mt-2 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
        <NavListMenu />

        {/* Main Menu */}
        <li>
          <NavLink
            onClick={closeCollapse}
            to="/"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={closeCollapse}
            to="/burger-builder"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Burger Builder
          </NavLink>
        </li>

        <li>
          <NavLink
            onClick={closeCollapse}
            to="/browse-foods"
            className={({ isActive }) =>
              isActive
                ? "active"
                : "hover:bg-gray-300 p-3 font-bold rounded-lg transition-all"
            }
          >
            Browse Food
          </NavLink>
        </li>

        <li>
          <button
            className="hover:bg-gray-300 px-3 py-2 rounded-lg transition-all"
            onClick={
              location.pathname === "/checkout" ? undefined : handleOpenDrawer
            }
          >
            <Badge content={user ? count : 0}>
              <HiOutlineShoppingBag size={"30"} />
            </Badge>
          </button>
        </li>

        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
          <MenuHandler>
            <div
              className="font-bold cursor-pointer rounded-lg flex gap-2 justify-center items-center p-2
          bg-[#0866ff] text-white"
            >
              <span>Partnership Program</span>
              <BsChevronDown
                strokeWidth={2.5}
                className={`h-3 w-3 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </MenuHandler>

          <MenuList className="shadow-xl">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                easings: ["easeInOut"],
              }}
              className="mb-2 outline-none"
            >
              <Link
                onClick={closeCollapse}
                to={"/be-a-partner"}
                className="p-2 w-full flex rounded-md mb-1 outline-none font-bold hover:bg-gray-100"
              >
                Become A Partner
              </Link>
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                easings: ["easeInOut"],
                delay: 0.2,
              }}
              className="outline-none"
            >
              <Link
                onClick={closeCollapse}
                to={"/be-a-rider"}
                className="p-2 w-full flex rounded-md mb-1 outline-none font-bold hover:bg-gray-100"
              >
                Become A Rider
              </Link>
            </motion.div>
          </MenuList>
        </Menu>
      </ul>
    </>
  );
}

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  let dispatch = useDispatch();

  const toggleIsNavOpen = () => {
    dispatch(openNavDrawer());
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <div className="mx-auto p-2 shadow-md sticky top-0 bg-[#F9FBE7] z-10">
      <div className="w-[95%] mx-auto flex items-center text-blue-gray-900 justify-between">
        <Link to={"/"}>
          <img
            className="w-[80px] md:w-[100px] lg:w-[100px]"
            src="./dinedash-logo.png"
            alt=""
          />
        </Link>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={() => {
            toggleIsNavOpen();
          }}
          className="ml-auto mr-2 lg:hidden outline-none"
        >
          <GiHamburgerMenu className="h-6 w-6 font-bold" />
        </IconButton>
        {/* <ProfileMenu /> */}
        <MyProfileMenu />
      </div>
      <Collapse open={isNavOpen}>
        <NavList closeCollapse={toggleIsNavOpen} />
      </Collapse>
    </div>
  );
}
