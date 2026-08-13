import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Loading from "../components/Loading/Loading";
import PrivateRoute from "../Provider/PrivateRoute";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payment from "../pages/Dashboard/Payments/Payment";
import PaymentSuccess from "../pages/Dashboard/Payments/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Payments/PaymentCancel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import Rider from "../pages/Rider/Rider";
import ApproveRider from "../pages/Dashboard/ApproveRider/ApproveRider";
import UserManagement from "../pages/Dashboard/UserManagement/UserManagement";
import AdminRoute from "../Provider/AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoute from "../Provider/RiderRoute";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import AboutUs from "../pages/AboutUs/AboutUs";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <Loading />,
    children: [
      { index: true, Component: Home },
      {
        path: "coverage",
        Component: Coverage,
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/FahimFaysalNirjhar/Warehouse-Data/refs/heads/main/warehouses.json",
          ).then((res) => res.json()),
      },
      {
        path: "sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/FahimFaysalNirjhar/Warehouse-Data/refs/heads/main/warehouses.json",
          ).then((res) => res.json()),
      },
      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            "https://raw.githubusercontent.com/FahimFaysalNirjhar/Warehouse-Data/refs/heads/main/warehouses.json",
          ).then((res) => res.json()),
      },
      {
        path: "parcel-tracking/:trackingId",
        Component: ParcelTrack,
      },
      {
        path: "about",
        Component: AboutUs,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "/dashboard/parcels",
        element: (
          <PrivateRoute>
            <MyParcels />
          </PrivateRoute>
        ),
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      {
        path: "approve-rider",
        // Component: ApproveRider,
        element: (
          <AdminRoute>
            <ApproveRider />
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        // Component: UserManagement,
        element: (
          <AdminRoute>
            <UserManagement />
          </AdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <AdminRoute>
            <AssignRiders />
          </AdminRoute>
        ),
      },
      {
        path: "assigned-deliveries",
        element: (
          <RiderRoute>
            <AssignedDeliveries />
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries />
          </RiderRoute>
        ),
      },
    ],
  },
]);
export default router;
