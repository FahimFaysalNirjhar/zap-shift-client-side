import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router";

const Logo = () => {
  return (
    <Link to="/" className="inline-block">
      <div className="flex items-end">
        <img src={logo} alt="ZapShift Logo" />
        <h1 className="text-[#303030] -ms-4.5 text-3xl font-extrabold">
          ZapShift
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
