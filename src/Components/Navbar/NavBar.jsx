import React from "react";
import "./NavBar.css";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

// Icons
import { AiFillHome } from "react-icons/ai";
import { FaBurger } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa6";
import { BiChevronDown } from "react-icons/bi";
import { HiBars2 } from "react-icons/hi2";
import { HiRocketLaunch } from "react-icons/hi2";
import { BiUser } from "react-icons/bi";
import { HiMiniShoppingCart } from "react-icons/hi2";

import { NavLink } from "react-router-dom";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: BiUser,
  },
  {
    label: "Sign Out",
    icon: FaPowerOff,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <BiChevronDown
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
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
      <div className="w-[95%] mx-auto flex items-center text-blue-gray-900">
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
        <ProfileMenu />
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </div>
  );
}
