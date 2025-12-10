import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/images/logo.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const current = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  }, [isDark]);

  const handleTheme = (checked) => {
    setIsDark(checked);
  };
  console.log(user?.photoURL);

  return (
    <nav className=" fixed top-0 left-0 right-0 border-b border-gray-50/35  shadow-md z-70 bg-base-100/95 ">
      <div className="max-w-[1440px] mx-auto h-16 flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="h-30 w-auto" alt="Logo" />
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-md font-medium pr-8">
          <ThemeToggle checked={isDark} handleTheme={handleTheme} />

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
              <Link className="px-4 py-2 my-btn" to="/login">
                Login
              </Link>

              <Link className="px-4 py-2 my-btn" to="/signup">
                Register
              </Link>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <NavLink to="/dashboard" className="hover:text-[#3BADCD]">
                Dashboard
              </NavLink>

              <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={user?.photoURL}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>

              <button onClick={logOut} className="px-4 py-2 my-btn">
                LogOut
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden px-8 flex items-center gap-4">
          <ThemeToggle checked={isDark} handleTheme={handleTheme} />

          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? (
              <X color="#3BADCD" size={25} />
            ) : (
              <Menu color="#3BADCD" size={25} />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="md:hidden fixed top-16 left-0 right-0 z-70 bg-base-100/95 
                     border-t border-base-300 p-4 text-md
                     flex flex-col items-center space-y-4 text-center text-base-content"
        >
          <NavLink className=" hover:text-[#3BADCD]" to="/">
            Home
          </NavLink>
          <NavLink className=" hover:text-[#3BADCD]" to="/products">
            All Products
          </NavLink>
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
                <Link className="px-4 py-2 my-btn" to="/login">
                  Login
                </Link>

                <Link
                  className="px-4 py-2 my-btn hover:scale-105 transition-transform"
                  to="/signup"
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
