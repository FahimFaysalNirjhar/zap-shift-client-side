import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../pages/Shared/Navbar/Navbar";

const RootLayout = () => {
  return (
    <div className="bg-secondary min-h-screen">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
