import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/logo.png";
import { GrLogout } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";

import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import ManagerMenu from "./Menu/ManagerMenu";
import UseRole from "@/hooks/UseRole";
import BuyerMenu from "./Menu/BuyerMenu";

const Sidebar = ({ isOpen, onToggle }) => {
  const { logOut } = useAuth();
  const [role] = UseRole();

  const handleToggle = () => {
    if (onToggle) onToggle();
  };

  console.log("role have", role);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
          onClick={handleToggle}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 shadow-lg z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Order Tracker" className="h-20 w-auto" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2">
            {role === "Buyer" && <BuyerMenu />}
            {role === "Manager" && <ManagerMenu />}
            {role === "Admin" && <AdminMenu />}
          </nav>
        </div>

        <div className="border-t border-gray-200 py-4 px-2">
          <MenuItem
            className="text-gray-700 hover:bg-gray-100 hover:text-[#3badcd]"
            icon={IoSettingsOutline}
            label="Profile"
            address="/dashboard/profile"
          />
          <button
            onClick={logOut}
            className="flex w-full items-center space-x-3 px-4 py-3 mt-2 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
          >
            <GrLogout className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
