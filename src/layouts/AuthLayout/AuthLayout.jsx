import React from "react";
import { Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";

const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10 min-h-screen">
      <Logo />

      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 mt-10">
        {/* Form Section */}
        <div className="w-full lg:w-1/2 max-w-md">
          <Outlet />
        </div>

        {/* Image Section */}
        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-lime-50 rounded-3xl p-8 lg:p-12">
          <img
            src="/authImage.png"
            alt="Authentication"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
