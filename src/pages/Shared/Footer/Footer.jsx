import React from "react";
import { Link, NavLink } from "react-router";

const Footer = () => {
  const navStyle = ({ isActive }) =>
    isActive
      ? "underline decoration-primary decoration-4 underline-offset-8 font-bold text-white"
      : "text-white text-base font-medium";

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

      <li>
        <NavLink to="/dashboard/parcels" className={navStyle}>
          My Parcels
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={navStyle}>
          Contact
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <footer className="footer footer-center bg-[#0B0B0B] rounded-2xl text-neutral-content p-10 gap-6 flex flex-col">
        {/* Logo & Brand */}
        <aside className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {/* ZapShift Z-bolt logo */}
            <Link to="/">
              <div className="flex items-end ">
                <img src="/logo.png" alt="" />
                <h1 className="text-white -ms-4.5 text-3xl font-extrabold">
                  ZapShift
                </h1>
              </div>
            </Link>
          </div>

          <p className="text-neutral-content/60 text-sm max-w-sm text-center leading-relaxed">
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </p>
        </aside>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-[#03464D] w-full lg:w-3xl"></div>

        {/* Nav Links */}
        <nav>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
        </nav>
        {/* Divider */}
        <div className="border-t-2 border-dashed border-[#03464D] w-full lg:w-3xl"></div>
        {/* Social Icons */}
        <nav>
          <div className="flex gap-4 items-center">
            {/* LinkedIn */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="btn btn-circle btn-sm bg-[#0A66C2] border-none hover:bg-[#0A66C2]/80 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>

            {/* X (Twitter) */}
            <a
              href="#"
              aria-label="X"
              className="btn btn-circle btn-sm bg-black border border-white/20 hover:bg-white/10 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.258 5.626 5.906-5.626zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              aria-label="Facebook"
              className="btn btn-circle btn-sm bg-[#1877F2] border-none hover:bg-[#1877F2]/80 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="#"
              aria-label="YouTube"
              className="btn btn-circle btn-sm bg-[#FF0000] border-none hover:bg-[#FF0000]/80 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </nav>

        {/* Copyright */}
        <p className="text-neutral-content/40 text-xs">
          Copyright © {new Date().getFullYear()} ZapShift — All rights reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;
