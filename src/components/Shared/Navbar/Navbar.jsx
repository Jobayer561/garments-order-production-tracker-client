import { useState } from "react";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="h-30 w-auto" alt="Logo" />
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-md font-medium">
          <NavLink to="/" className="hover:text-[#3BADCD]">
            Home
          </NavLink>
          <NavLink to="/products" className="hover:text-[#3BADCD]">
            AllProducts
          </NavLink>
          <NavLink to="/about" className="hover:text-[#3BADCD]">
            AboutUs
          </NavLink>
          <NavLink to="/contact" className="hover:text-[#3BADCD]">
            Contact
          </NavLink>

          {!user ? (
            <>
              <Link
                className="px-4 py-2 text-white bg-[#3BADCD] rounded-full hover:bg-[#299bbc]"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="px-4 py-2 text-white bg-[#3BADCD] rounded-full hover:bg-[#299bbc]"
                to="/register"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink to="/dashboard" className="hover:text-[#3BADCD]">
                Dashboard
              </NavLink>

              {/* User Avatar */}
              <div className="w-10 h-10 flex items-center justify-center bg-[#3BADCD] text-white rounded-full overflow-hidden">
                <img
                  src={user.photoURL}
                  className="w-full h-full object-cover"
                  alt="User"
                />
              </div>

              <button
                onClick={logOut}
                className="px-4 py-2 bg-[#3BADCD] text-white  rounded-md "
              >
                LogOut
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
        >
          {isOpen ? (
            <X className="hover:text-[#3BADCD]" size={25} />
          ) : (
            <Menu size={25} />
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className="md:hidden bg-white border-t p-4 text-md 
                  flex flex-col items-center space-y-4 text-center"
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Products</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>

              <button
                onClick={logOut}
                className="px-4 py-2 bg-[#3BADCD] text-white rounded-md"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <Link
                  className="px-4 py-2 text-white bg-[#3BADCD] rounded-full 
                       hover:bg-[#299bbc]"
                  to="/login"
                >
                  Login
                </Link>

                <Link
                  className="px-4 py-2 text-white bg-[#3BADCD] rounded-full 
                       hover:bg-[#299bbc]"
                  to="/register"
                >
                  Register
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
