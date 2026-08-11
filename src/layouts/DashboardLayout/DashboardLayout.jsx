import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";

// Single source of truth for the sidebar — add/remove items here only.
const NAV_ITEMS = [
  {
    section: null,
    links: [
      {
        to: "/dashboard/parcels",
        label: "My Parcels",
        icon: "box",
      },
      {
        to: "/dashboard/payment-history",
        label: "Payment History",
        icon: "receipt",
      },
      {
        to: "/dashboard/approve-rider",
        label: "Approve Rider",
        icon: "user-check",
        roles: ["admin"],
      },
      {
        to: "/dashboard/assign-rider",
        label: "Assign Riders",
        icon: "truck",
        roles: ["admin"],
      },
      {
        to: "/dashboard/user-management",
        label: "User Management",
        icon: "users",
        roles: ["admin"],
      },
    ],
  },
  {
    section: "GENERAL",
    links: [],
  },
];

const strokeIcon = (paths, extraClass = "") => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    strokeLinejoin="round"
    strokeLinecap="round"
    strokeWidth="2"
    fill="none"
    stroke="currentColor"
    className={`my-1.5 inline-block size-4 shrink-0 ${extraClass}`}
  >
    {paths}
  </svg>
);

const ICONS = {
  box: strokeIcon(
    <>
      <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9z" />
      <path d="M12 12l8 -4.5" />
      <path d="M12 12v9" />
      <path d="M12 12l-8 -4.5" />
    </>,
  ),
  receipt: strokeIcon(
    <>
      <path d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </>,
  ),
  "user-check": strokeIcon(
    <>
      <path d="M8 7a4 4 0 1 0 0 8a4 4 0 0 0 0 -8z" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
      <path d="M15 19l2 2l4 -4" />
    </>,
  ),
  truck: strokeIcon(
    <>
      <path d="M3 17h1a2 2 0 0 0 4 0h8a2 2 0 0 0 4 0h1v-6l-3 -5h-4v11" />
      <path d="M3 9h11v8" />
      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    </>,
  ),
  logout: strokeIcon(
    <>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M7 12h14l-3 -3" />
      <path d="M18 15l3 -3" />
    </>,
  ),
  panel: strokeIcon(
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
    </>,
    "size-5",
  ),
  users: strokeIcon(
    <>
      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
    </>,
  ),
};

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all whitespace-nowrap ${
    isActive
      ? "bg-[#c7e94f] text-[#113a3a]"
      : "text-white hover:bg-[#eef8ea] hover:text-[#113a3a]"
  }`;

const DashboardLayout = () => {
  const { user, LogOut } = useAuth();
  const { role } = useRole();

  console.log("role", role);

  // One state drives both: mobile overlay (translate) and desktop collapse (width)
  const [sidebarOpen, setSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );

  const handleLogout = async () => {
    try {
      await LogOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f6] flex max-w-7xl mx-auto lg:px-4 lg:py-9">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 z-40 flex h-screen flex-col overflow-hidden bg-[#113a3a] transition-all duration-300 ease-in-out
          w-72 shrink-0
          ${sidebarOpen ? "translate-x-0 lg:w-72" : "-translate-x-full lg:translate-x-0 lg:w-0"}`}
      >
        <div className="px-5 py-5 shrink-0">
          <Link to="/">
            <div className="flex items-end">
              <img src="/logo.png" alt="" />
              <h1 className="text-white -ms-4.5 text-3xl font-extrabold whitespace-nowrap">
                ZapShift
              </h1>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
          {NAV_ITEMS.map((group, i) => (
            <div key={i}>
              {group.section && (
                <p className="px-3 mb-2 text-xs font-semibold tracking-wide text-gray-400">
                  {group.section}
                </p>
              )}
              <ul className="menu w-full p-0 gap-1">
                {group.links
                  .filter((link) => !link.roles || link.roles.includes(role))
                  .map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.end}
                        onClick={() => {
                          if (window.innerWidth < 1024) setSidebarOpen(false);
                        }}
                        className={navLinkClasses}
                      >
                        {ICONS[link.icon]}
                        <span>{link.label}</span>
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="px-3 pb-5 pt-2 border-t border-white/10 shrink-0">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-300 hover:bg-rose-500/10 whitespace-nowrap"
          >
            {ICONS.logout}
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex-1 min-w-0">
        <nav className="navbar w-full bg-white border-b border-gray-100 px-3 sm:px-6 sticky top-0 z-20">
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="btn btn-square btn-ghost shrink-0 hover:bg-[#e0fbfc] active:bg-[#e0fbfc]"
          >
            {ICONS.panel}
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 border-l border-gray-200">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={user?.displayName || "User"}
                  />
                </div>
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-sm font-semibold text-[#113a3a]">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[180px]">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-3 sm:p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
