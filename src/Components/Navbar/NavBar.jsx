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
import { HiBars2 } from "react-icons/hi2";
import { HiRocketLaunch } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";

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
          <NavLink
            to={"/cart"}
            onClick={closeCollapse}
            className={({ isActive }) =>
              isActive
                ? "cartActive"
                : "hover:bg-gray-300 p-3 flex font-bold rounded-lg transition-all"
            }
          >
            <Badge content={user ? count : 0}>
              <HiOutlineShoppingBag size={"30"} />
            </Badge>
          </NavLink>
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
            <div className="mb-2 outline-none">
              <Link
                onClick={closeCollapse}
                to={"/be-a-partner"}
                className="p-2 w-full flex rounded-md mb-1 outline-none font-bold hover:bg-gray-100"
              >
                Become A Partner
              </Link>
            </div>

            <div className="outline-none">
              <Link
                onClick={closeCollapse}
                to={"/be-a-rider"}
                className="p-2 w-full flex rounded-md mb-1 outline-none font-bold hover:bg-gray-100"
              >
                Become A Rider
              </Link>
            </div>
          </MenuList>
        </Menu>
      </ul>
    </>
  );
}

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

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
            className="w-[100px]"
            src="https://i.ibb.co/kBDBhVs/dinedash.png"
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
          className="ml-auto mr-2 lg:hidden"
        >
          <HiBars2 className="h-6 w-6" />
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
