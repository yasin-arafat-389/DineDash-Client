import React from "react";
import "./NavBar.css";
import {
  Menu,
  MenuList,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";

// Icons
import { AiFillHome } from "react-icons/ai";
import { FaBurger } from "react-icons/fa6";
import { HiBars2 } from "react-icons/hi2";
import { HiRocketLaunch } from "react-icons/hi2";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { Link, NavLink } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";
import useAuth from "../../Hooks/useAuth";

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

// nav list component
const navListItems = [
  {
    label: "Home",
    href: "/",
    icon: AiFillHome,
  },
  {
    label: "Burger Builder",
    href: "/burger-builder",
    icon: FaBurger,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: HiMiniShoppingCart,
  },
];

function NavList() {
  return (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      <NavListMenu />
      {navListItems.map(({ label, icon, href }) => (
        <NavLink key={label} to={href} className="text-[#000]">
          <div className="flex items-center gap-2  p-2">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}
            {label}
          </div>
        </NavLink>
      ))}
    </ul>
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
    <div className="mx-auto p-2 shadow-lg sticky top-0 bg-white z-10">
      <div className="w-[95%] mx-auto flex items-center text-blue-gray-900 justify-between">
        <img
          className="w-[100px]"
          src="https://i.ibb.co/kBDBhVs/dinedash.png"
          alt=""
        />
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <HiBars2 className="h-6 w-6" />
        </IconButton>
        {/* <ProfileMenu /> */}
        <MyProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </div>
  );
}
