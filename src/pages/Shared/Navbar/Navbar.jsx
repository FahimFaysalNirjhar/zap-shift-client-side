import React from "react";
import Logo from "../../../components/Logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import { ImArrowUpRight2 } from "react-icons/im";
import useAuth from "../../../Hooks/useAuth";

const Navbar = () => {
  const navStyle = ({ isActive }) =>
    isActive
      ? "underline decoration-primary decoration-4 underline-offset-8 font-bold text-black"
      : "text-[#606060] text-base font-medium";

  const { user, LogOut } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = () => {
    LogOut().then(() => {
      navigate("/login");
    });
  };

  const links = (
    <>
      <li>
        <NavLink to="/services" className={navStyle}>
          Services
        </NavLink>
      </li>

      <li>
        <NavLink to="/coverage" className={navStyle}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/sendParcel" className={navStyle}>
          Send Parcel
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className={navStyle}>
          About Us
        </NavLink>
      </li>

      <li>
        <NavLink to="/pricing" className={navStyle}>
          Pricing
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to="/dashboard/parcels" className={navStyle}>
            My Parcels
          </NavLink>
        </li>
      )}

      <li>
        <NavLink to="/rider" className={navStyle}>
          Be a Rider
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="max-w-7xl mx-auto lg:px-4 lg:py-9">
      <div className="navbar bg-base-100 shadow-sm lg:rounded-2xl lg:p-4">
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
          <a className="btn btn-ghost text-xl hidden md:flex">
            <Logo />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {/* RIGHT: Sign In + Sign Up + Arrow */}
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <>
              <img
                src={user?.photoURL}
                alt={user?.displayName || "User"}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border"
              />

              <button
                onClick={handleSignOut}
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline border-[#DADADA] text-[#606060] font-bold hover:bg-[#C5E829] hover:border-[#C5E829] hover:text-[#0F172A]"
              >
                Sign In
              </Link>

              <Link to="/register">
                <div className="flex items-center">
                  <button className="btn bg-primary text-[#1F1F1F] font-bold rounded text-xs border-0 sm:text-sm px-3 sm:px-4 h-9 sm:h-10 min-h-0 hover:bg-[#0F172A] hover:text-white">
                    Sign Up
                  </button>

                  <div className="bg-[#1E1E1E] rounded-full flex items-center justify-center p-2 sm:p-[10px] shrink-0">
                    <ImArrowUpRight2 className="text-primary text-xs sm:text-sm stroke-[0.5]" />
                  </div>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
