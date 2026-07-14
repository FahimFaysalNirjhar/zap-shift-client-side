import React from "react";
import { NavLink, Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";
import useAuth from "../../Hooks/useAuth";

// Single source of truth for the sidebar — add/remove items here only.
const NAV_ITEMS = [
  {
    section: null,
    links: [
      { to: "/dashboard/parcels", label: "My Parcels", icon: "box" },
      // { to: "/dashboard", label: "Dashboard", end: true, icon: "layout" },
      // { to: "/dashboard/invoices", label: "Invoices", icon: "receipt" },
      // { to: "/dashboard/stores", label: "Stores", icon: "store" },
      // { to: "/dashboard/pricing", label: "Pricing Plan", icon: "tag" },
      // { to: "/dashboard/coverage", label: "Coverage Area", icon: "map" },
    ],
  },
  {
    section: "GENERAL",
    links: [
      // { to: "/dashboard/settings", label: "Settings", icon: "settings" },
      // {
      //   to: "/dashboard/change-password",
      //   label: "Change Password",
      //   icon: "lock",
      // },
      // { to: "/dashboard/help", label: "Help", icon: "help" },
    ],
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
  layout: strokeIcon(
    <>
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M4 12h16" />
      <path d="M12 4v16" />
    </>,
  ),
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
  store: strokeIcon(
    <>
      <path d="M3 21l18 0" />
      <path d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1l-2 -4h-14l-2 4" />
      <path d="M5 21l0 -10.15" />
      <path d="M19 21l0 -10.15" />
      <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4" />
    </>,
  ),
  tag: strokeIcon(
    <>
      <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
    </>,
  ),
  map: strokeIcon(
    <>
      <path d="M18 6c0 3.314 -2.686 7 -6 7s-6 -3.686 -6 -7a6 6 0 0 1 12 0" />
      <path d="M12 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M12 13v8" />
      <path d="M9 20h6" />
    </>,
  ),
  settings: strokeIcon(
    <>
      <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </>,
  ),
  lock: strokeIcon(
    <>
      <path d="M5 13m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
      <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
    </>,
  ),
  help: strokeIcon(
    <>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 17l0 .01" />
      <path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />
    </>,
  ),
  logout: strokeIcon(
    <>
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M7 12h14l-3 -3" />
      <path d="M18 15l3 -3" />
    </>,
  ),
  bell: strokeIcon(
    <>
      <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
      <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
    </>,
    "size-5",
  ),
  menu: strokeIcon(
    <>
      <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M9 4v16" />
      <path d="M14 10l2 2l-2 2" />
    </>,
  ),
};

const navLinkClasses = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
    isActive
      ? "bg-[#c7e94f] text-[#113a3a]"
      : "text-white lg:text-gray-600 hover:bg-[#eef8ea] hover:text-[#113a3a]"
  }`;

const DashboardLayout = () => {
  // Swap for the logged-in user from your auth context / hook.
  const { user, LogOut } = useAuth();
  const closeDrawer = () => {
    const drawer = document.getElementById("my-drawer-4");

    if (drawer instanceof HTMLInputElement) {
      drawer.checked = false;
    }
  };
  const handleLogout = async () => {
    try {
      await LogOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content bg-[#f7f8f6] min-h-screen">
        {/* Navbar */}
        <nav className="navbar w-full bg-white border-b border-gray-100 px-3 sm:px-6 sticky top-0 z-20">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost lg:hidden shrink-0"
          >
            {ICONS.menu}
          </label>

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

        {/* Page content */}
        <div className="p-3 sm:p-4 lg:p-6">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-30">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col bg-[#113a3a] lg:bg-white w-72 border-r border-gray-100">
          <div className="px-5 py-5">
            <Logo />
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
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        end={link.end}
                        onClick={closeDrawer}
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

          <div className="px-3 pb-5 pt-2 border-t border-white/10 lg:border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-rose-300 lg:text-rose-500 hover:bg-rose-500/10"
            >
              {ICONS.logout}
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
