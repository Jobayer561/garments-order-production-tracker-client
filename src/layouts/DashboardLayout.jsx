import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardNavbar from "@/components/Dashboard/DashboardNavbar";
import { Menu } from "lucide-react";
import { AiOutlineBars } from "react-icons/ai";

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={isMobileMenuOpen} onToggle={handleMenuToggle} />

      <DashboardNavbar />

      <main className="pt-16 md:ml-64 min-h-screen">
        <div className="p-6 md:p-8">
          <div className="md:hidden flex justify-end mb-6">
            <button
              onClick={handleMenuToggle}
              className="p-0 bg-transparent border-none focus:outline-none"
              aria-label="Toggle menu"
            >
              <AiOutlineBars size={20} className="text-gray-700" />
            </button>
          </div>

          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
