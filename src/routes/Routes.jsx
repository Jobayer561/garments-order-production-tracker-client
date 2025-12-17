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
import ManageOrders from "../pages/Dashboard/Manager/ManageOrders";
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
        element: <ProductDetails />,
      },
      { path: "/about-us", element: <AboutUs /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/order/:id",
        element: <OrderPage />,
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
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "track-order",
        element: (
          <PrivateRoute>
            <TrackOrder />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <ManageUsers />
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
        path: "manage-orders",
        element: <ManageOrders />,
      },
      {
        path: "pending-orders",
        element: <PendingOrders />,
      },
      { path: "approve-orders", element: <ApproveOrders /> },
      {
        path: "manage-products",
        element: <ManageProducts />,
      },
      {
        path: "all-products",
        element: <AllProduct />,
      },
      {
        path: "all-orders",
        element: <ManageAllOrders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "tracking/:trackingId",
        element: <TrackingTimelinePage />,
      },
    ],
  },
]);
