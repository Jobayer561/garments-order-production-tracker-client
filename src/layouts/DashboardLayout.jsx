import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "@/components/Shared/Navbar/Navbar";
import Footer from "@/components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="relative pt-16">
        <Sidebar />

        <div className="md:ml-64  flex flex-col">
          <main className="flex-1 p-5 min-h-screen">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
