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
]);
export default router;
