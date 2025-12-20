import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import Profile from "../pages/Dashboard/Common/Profile";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MainLayout from "../layouts/MainLayout";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders";
import { createBrowserRouter } from "react-router";
import AllProducts from "@/pages/AllProducts";
import ProductDetails from "@/pages/ProductDetails";
import AboutUs from "@/pages/AboutUs";
import Contact from "@/pages/Contact";
import OrderPage from "@/pages/OrderPage";
import AddProduct from "../pages/Dashboard/Manager/AddProduct";
import PaymentSuccess from "@/components/Home/PaymentSuccess";
import TrackOrder from "@/pages/Dashboard/Buyer/TrackOrder";
import PendingOrders from "@/pages/Dashboard/Manager/PendingOrders";
import ApproveOrders from "@/pages/Dashboard/Manager/ApproveOrders";
import ManageProducts from "@/pages/Dashboard/Manager/ManageProducts";
import AllProduct from "@/pages/Dashboard/Admin/AllProduct";
import ManageAllOrders from "@/pages/Dashboard/Admin/ManageAllOrders";
import OrderDetails from "@/pages/Dashboard/Admin/OrderDetails";
import TrackingTimelinePage from "@/pages/Dashboard/Common/TrackingTimelinePage";
import ManagerRoute from "./ManagerRoute";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "/allProducts",
        element: <AllProducts />,
      },
      {
        path: "/allProducts/:id",
        element: (
          <PrivateRoute>
            <ProductDetails />,
          </PrivateRoute>
        ),
      },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRoute>
            <OrderPage />,
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <AddProduct />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "track-order",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <TrackOrder />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },

      {
        path: "pending-orders",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <PendingOrders />,
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "approve-orders",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ApproveOrders />
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "track-info/:orderId",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <TrackingTimelinePage />,
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute>
            <ManagerRoute>
              <ManageProducts />,
            </ManagerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-products",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllProduct />,
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-orders",

        element: (
          <PrivateRoute>
              <ManageAllOrders />,
          </PrivateRoute>
        ),
      },
      {
        path: "orders/:id",
        element: (
          <PrivateRoute>
            <OrderDetails />,
          </PrivateRoute>
        ),
      },
      {
        path: "track-order/:orderId",
        element: (
          <PrivateRoute>
            <TrackOrder />,
          </PrivateRoute>
        ),
      },
    ],
  },
]);
