import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen md:flex  pt-16 ">
        <Sidebar />

        <div className="flex-1  p-5 min-h-screen">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
