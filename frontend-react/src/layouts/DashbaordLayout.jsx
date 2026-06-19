import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiBell,
} from "react-icons/fi";

const menuItems = [
  {
    title: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },
  {
    title: "Teachers",
    icon: FiUsers,
    path: "/dashboard/teachers",
  },
  {
    title: "Academics",
    icon: FiBookOpen,
    children: [
      { title: "Subjects", path: "/dashboard/subjects" },
      { title: "Classes", path: "/dashboard/classes" },
      { title: "Timetable", path: "/dashboard/timetable" },
    ],
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState("");

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? "" : title);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50">
        <div className="h-full px-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

          <button className="h-10 w-10 rounded-xl hover:bg-gray-100 flex items-center justify-center">
            <FiBell size={20} />
          </button>
        </div>
      </header>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`relative bg-white border-r border-gray-200 transition-all duration-150 min-h-[calc(100vh-64px)]
          ${sidebarOpen ? "w-64" : "w-20"}`}
        >
          {/* Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-1/2 -right-4 -translate-y-1/2 h-8 w-8 rounded-full bg-white border shadow flex items-center justify-center z-50"
          >
            {sidebarOpen ? <FiChevronLeft /> : <FiChevronRight />}
          </button>

          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;

                // Normal Link
                if (!item.children) {
                  return (
                    <div key={item.title} className="relative group">
                      <NavLink
                        to={item.path}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl transition
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-600 hover:bg-gray-100"
                          }`
                        }
                      >
                        <Icon size={20} />

                        {sidebarOpen && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>

                      {/* Tooltip */}
                      {!sidebarOpen && (
                        <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                          {item.title}
                        </div>
                      )}
                    </div>
                  );
                }

                // Dropdown Menu
                return (
                  <div key={item.title} className="relative group">
                    <button
                      onClick={() => sidebarOpen && toggleMenu(item.title)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />

                        {sidebarOpen && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </div>

                      {sidebarOpen &&
                        (openMenu === item.title ? (
                          <FiChevronDown />
                        ) : (
                          <FiChevronRight />
                        ))}
                    </button>

                    {/* Tooltip */}
                    {!sidebarOpen && (
                      <div className="absolute left-16 top-0 bg-white border shadow-xl rounded-xl w-56 hidden group-hover:block z-50">
                        <div className="px-4 py-3 border-b font-semibold">
                          {item.title}
                        </div>

                        {item.children.map((child) => (
                          <NavLink
                            key={child.title}
                            to={child.path}
                            className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-100"
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    )}

                    {/* Expanded submenu */}
                    {sidebarOpen && openMenu === item.title && (
                      <div className="ml-10 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.title}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-3 py-2 rounded-lg text-sm transition
                              ${
                                isActive
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-gray-500 hover:bg-gray-100"
                              }`
                            }
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 min-h-[calc(100vh-112px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;