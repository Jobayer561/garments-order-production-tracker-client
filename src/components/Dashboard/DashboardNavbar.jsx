import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import useAuth from "@/hooks/useAuth";
import { ChevronDown, LogOut, User, Home } from "lucide-react";
import logo from "@/assets/images/logo.png";

const DashboardNavbar = () => {
  const { user, logOut } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

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
    <nav className="fixed top-0 right-0 left-0 md:left-64 bg-white border-b border-gray-200 shadow-sm z-40 h-16">
      <div className="px-6 h-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Order Tracker"
            className="h-20 w-auto md:hidden"
          />
          <span className="text-base md:text-xl font-bold md:font-semibold text-[#3badcd] hidden md:inline-block">
            GarmentsFlow
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
            >
              <span className="hidden md:block text-sm font-medium text-gray-700">
                {user?.displayName || user?.email?.split("@")[0] || "User"}
              </span>

              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-gray-300 shrink-0">
                <img
                  src={
                    user?.photoURL ||
                    "https://i.ibb.co/hKwVRrB/default-avatar.png"
                  }
                  alt={user?.displayName || "User"}
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

              <ChevronDown
                size={18}
                className={`text-gray-600 transition-transform duration-200 ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-slate-700 py-1 overflow-hidden">
                <Link
                  to="/dashboard/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-gray-700 dark:text-gray-300"
                >
                  <User
                    size={18}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <span className="text-sm font-medium">Profile</span>
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setIsProfileOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700"
                >
                  <Home size={18} className="text-gray-500" />
                  <span className="text-sm font-medium">Dashboard Home</span>
                </Link>

                <div className="border-t border-gray-200 my-1"></div>

                <button
                  onClick={() => {
                    setIsProfileOpen(false);
                    logOut();
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
