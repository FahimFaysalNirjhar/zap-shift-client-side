import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end ">
      <img src={logo} alt="" />
      <h1 className="text-[#303030] -ms-4.5 text-3xl font-extrabold">
        ZapShift
      </h1>
    </div>
  );
};

export default Logo;
