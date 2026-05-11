import React from "react";
import Logo from "../../../components/Logo/Logo";
import { NavLink } from "react-router";
import { BsArrowUpRight } from "react-icons/bs";
import { ImArrowUpRight2 } from "react-icons/im";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "underline decoration-primaryunderline decoration-primary decoration-4 underline-offset-8 font-bold"
              : "text-[#606060] text-base font-medium"
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "underline decoration-primaryunderline decoration-primary decoration-4 underline-offset-8 font-bold"
              : "text-[#606060] text-base font-medium"
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "underline decoration-primaryunderline decoration-primary decoration-4 underline-offset-8 font-bold"
              : "text-[#606060] text-base font-medium"
          }
        >
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "underline decoration-primaryunderline decoration-primary decoration-4 underline-offset-8 font-bold"
              : "text-[#606060] text-base font-medium"
          }
        >
          Pricing
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "underline decoration-primaryunderline decoration-primary decoration-4 underline-offset-8 font-bold"
              : "text-[#606060] text-base font-medium"
          }
        >
          Blog
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "underline decoration-primaryunderline decoration-primary decoration-4 underline-offset-8 font-bold"
              : "text-[#606060] text-base font-medium"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <Logo></Logo>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-4">
          <a className="btn btn-outline border-[#DADADA] text-[#606060] font-bold">
            Sign In
          </a>
          <div className="flex">
            <a className="btn bg-primary text-[#1F1F1F] font-bold">Sign Up</a>
            <div className=" rounded-full bg-[#1E1E1E] flex items-center justify-center p-3">
              <ImArrowUpRight2 className="text-primary text-base stroke-[0.5]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
