import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router";
import logo from "../../../assets/images/logo.png";
import ThemeToggle from "./ThemeToggle";
import UseRole from "@/hooks/UseRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role] = UseRole();
  console.log(role);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const current = isDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", current);
    localStorage.setItem("theme", current);
  }, [isDark]);

  const handleTheme = (checked) => {
    setIsDark(checked);
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === "Escape") setIsProfileOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 border-b border-gray-50/35 shadow-md z-70 bg-base-100/95">
      <div className="max-w-[1440px] mx-auto h-16 flex items-center justify-between">
        <Link to="/">
          <img src={logo} className="h-30 w-auto" alt="Logo" />
        </Link>

        <div className="hidden md:flex items-center space-x-6 text-md font-medium pr-8">
          <ThemeToggle checked={isDark} handleTheme={handleTheme} />

          <NavLink to="/" className="hover:text-[#3BADCD]">
            Home
          </NavLink>
          <NavLink to="/allProducts" className="hover:text-[#3BADCD]">
            AllProducts
          </NavLink>
          <NavLink to="/about-us" className="hover:text-[#3BADCD]">
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

              <div className="flex items-center space-x-3">
                <div className="relative" ref={profileRef}>
                  <button
                    type="button"
                    className="w-10 h-10 rounded-full overflow-hidden border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#3BADCD]"
                    aria-haspopup="menu"
                    aria-expanded={isProfileOpen}
                    aria-controls="profile-menu"
                    onClick={() => setIsProfileOpen((v) => !v)}
                  >
                    <img
                      src={
                        user?.photoURL ||
                        "https://i.ibb.co/hKwVRrB/default-avatar.png"
                      }
                      alt="User menu"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      crossOrigin="anonymous"
                    />
                  </button>

                  {isProfileOpen && (
                    <div
                      id="profile-menu"
                      role="menu"
                      className="absolute right-0 mt-2 w-56 rounded-md border border-base-300 bg-base-100 shadow-lg z-70"
                    >
                      <div className="px-4 py-3 border-b border-base-300 space-y-1">
                        <p className="text-sm font-semibold truncate">
                          {user?.displayName || "User"}
                        </p>
                        {user?.email && (
                          <p className="text-xs opacity-70 truncate">
                            {user.email}
                          </p>
                        )}
                        {role && (
                          <p className="text-xs font-semibold text-[#3BADCD] uppercase tracking-wide">
                            {role}
                          </p>
                        )}
                      </div>
                      <div className="py-1">
                        <NavLink
                          to="/dashboard/profile"
                          role="menuitem"
                          className={({ isActive }) =>
                            `block px-4 py-2 text-sm text-left hover:bg-base-200 ${
                              isActive ? "text-[#3BADCD]" : ""
                            }`
                          }
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Profile
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={logOut}
                  className="px-4 py-2 rounded-full bg-[#3BADCD] text-white font-semibold shadow hover:bg-[#349db9] focus:outline-none focus:ring-2 focus:ring-[#3BADCD]/70"
                >
                  LogOut
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden px-8 flex items-center gap-4">
          <ThemeToggle checked={isDark} handleTheme={handleTheme} />

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X color="#3BADCD" size={25} />
            ) : (
              <Menu color="#3BADCD" size={25} />
            )}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 z-70 bg-base-100/95 border-t border-base-300 p-4 text-md flex flex-col items-center space-y-4 text-center">
          {user && (
            <div className="flex flex-col items-center gap-2 pb-4 border-b w-full">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-300">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/hKwVRrB/default-avatar.png"
                  }
                  alt="User"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://i.ibb.co/hKwVRrB/default-avatar.png";
                  }}
                />
              </div>
              <p className="text-sm font-medium">
                {user?.displayName || "User"}
              </p>
            </div>
          )}

          <NavLink to="/" className="hover:text-[#3BADCD]">
            Home
          </NavLink>
          <NavLink to="/allProducts" className="hover:text-[#3BADCD]">
            All Products
          </NavLink>
          <NavLink to="/about-us">About Us</NavLink>
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
            <div className="flex gap-3">
              <Link className="px-4 py-2 my-btn" to="/login">
                Login
              </Link>
              <Link className="px-4 py-2 my-btn" to="/signup">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
