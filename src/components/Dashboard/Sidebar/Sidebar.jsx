import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo.png";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import UseRole from "@/hooks/UseRole";
import BuyerMenu from "./Menu/BuyerMenu";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role] = UseRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div className="">
      {/* Small Screen Navbar, only visible till md breakpoint */}
      <div className=" text-gray-800 flex justify-between md:hidden ">
        <div>
          <div className="block cursor-pointer md:p-4 p-2 sm:mt-0 mt-12 font-bold">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:sticky min-h-md md:min-h-screen absolute inset-y-0 left-0
  w-64 bg-gray-200 flex flex-col
  md:pt-0 pt-12 pb-4
  transition duration-200 ease-in-out
  ${isActive && "-translate-x-full"}
  md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Top Content */}
          <div>
            {/* Logo */}
            <div className="w-full hidden md:flex shadow-lg rounded-lg justify-center items-center  mx-auto">
              <Link to="/">
                <img src={logo} alt="logo" width="100" height="100" />
              </Link>
            </div>
          </div>

          {/* Middle Content */}
          <div className="flex flex-col flex-1 overflow-hidden ">
            {/*  Menu Items */}
            <nav className="flex-1 overflow-y-auto pr-1 sm:pt-0 pt-12">
              {/* Common Menu */}

              {/* Role-Based Menu */}
              { <BuyerMenu />}
              {<ManagerMenu />}

              { <AdminMenu />}
            </nav>
          </div>

          {/* Bottom Content */}
          <div>
            <hr className="" />

            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />
            <button
              onClick={logOut}
              className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-[#3badcd]   hover:text-white transition-colors duration-300 transform"
            >
              <GrLogout className="w-5 h-5" />

              <span className="mx-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
