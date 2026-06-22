import React, { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiBell,
  FiMenu, // Added hamburger icon
  FiX     // Added close icon for mobile panel
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New mobile toggle state
  const [openMenu, setOpenMenu] = useState("");
  const location = useLocation();

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? "" : title);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 relative overflow-hidden font-sans">
      {/* Ambient background glowing decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header with glassmorphism */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0f172a]/70 border-b border-slate-800/60 backdrop-blur-md z-50">
        <div className="h-full px-4 sm:px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            {/* Hamburger Button visible only on smaller displays */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden h-10 w-10 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-700/50 flex items-center justify-center transition"
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>

            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Engine <span className="text-blue-400">Portal</span>
            </h1>
          </div>

          <button className="h-10 w-10 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-300 border border-slate-700/50 hover:border-slate-600 transition flex items-center justify-center relative">
            <FiBell size={18} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          </button>
        </div>
      </header>

      <div className="flex pt-16 relative z-10">
        
        {/* 1. Desktop Sidebar - hidden below md screen layout breaks */}
        <aside
          className={`hidden md:block relative bg-[#0f172a]/40 border-r border-slate-800/60 backdrop-blur-md transition-all duration-150 min-h-[calc(100vh-64px)]
          ${sidebarOpen ? "w-64" : "w-20"}`}
        >
          {/* Collapse Sidebar Toggle Pin Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute top-1/2 -right-4 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-800 border border-slate-700 text-slate-300 shadow-xl flex items-center justify-center z-50 hover:text-white hover:border-slate-500 transition"
          >
            {sidebarOpen ? <FiChevronLeft size={16} /> : <FiChevronRight size={16} />}
          </button>

          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                if (!item.children) {
                  const isTeachersMenu = item.title === "Teachers";

                  return (
                    <div key={item.title} className="relative group">
                      <NavLink
                        to={item.path}
                        className={() =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition duration-200
                          ${isTeachersMenu ? "tour-teachers-nav" : ""} 
                          ${
                            isActive
                              ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30"
                              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent"
                          }`
                        }
                      >
                        <Icon size={18} />
                        {sidebarOpen && <span className="text-sm tracking-wide">{item.title}</span>}
                      </NavLink>

                      {!sidebarOpen && (
                        <div className=" absolute left-16 top-1/2 -translate-y-1/2 bg-slate-900 border border-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition shadow-xl whitespace-nowrap pointer-events-none z-50">
                          {item.title}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <div key={item.title} className="relative group">
                    <button
                      onClick={() => sidebarOpen && toggleMenu(item.title)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition border border-transparent"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} />
                        {sidebarOpen && <span className="text-sm tracking-wide">{item.title}</span>}
                      </div>
                      {sidebarOpen && (openMenu === item.title ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />)}
                    </button>

                    {!sidebarOpen && (
                      <div className="absolute left-16 top-0 bg-slate-900 border border-slate-800 shadow-2xl rounded-xl w-56 hidden group-hover:block overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2.5 bg-slate-850 border-b border-slate-800 font-semibold text-xs tracking-wider text-slate-400 uppercase">
                          {item.title}
                        </div>
                        {item.children.map((child) => (
                          <NavLink
                            key={child.title}
                            to={child.path}
                            className="block px-4 py-3 text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 transition"
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    )}

                    {sidebarOpen && openMenu === item.title && (
                      <div className="ml-6 mt-1 pl-4 border-l border-slate-800 space-y-1 animate-in slide-in-from-top-2 duration-150">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.title}
                            to={child.path}
                            className={({ isActive }) =>
                              `block px-3 py-2 text-xs font-medium rounded-lg transition duration-150
                              ${isActive ? "text-blue-400 bg-blue-500/5 font-semibold" : "text-slate-500 hover:text-slate-300"}`
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

        {/* 2. Mobile Responsive Drawer - slides over panel layout on smaller views */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            {/* Backdrop shading overlay click-shield */}
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            <aside className="relative w-64 max-w-xs bg-[#0f172a] border-r border-slate-800 text-slate-100 p-4 flex flex-col h-full z-50 animate-in slide-in-from-left duration-200">
              <nav className="space-y-2 mt-14">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;

                  if (!item.children) {
                    return (
                      <NavLink
                        key={item.title}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)} // Auto-close drawer on touch select
                        className={
                          `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition duration-200
                          ${isActive 
                            ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30" 
                            : "text-slate-400 hover:bg-slate-800/50 border border-transparent"}`
                        }
                      >
                        <Icon size={18} />
                        <span className="text-sm tracking-wide">{item.title}</span>
                      </NavLink>
                    );
                  }

                  return (
                    <div key={item.title} className="space-y-1">
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-slate-800/50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} />
                          <span className="text-sm tracking-wide">{item.title}</span>
                        </div>
                        {openMenu === item.title ? <FiChevronDown size={14} /> : <FiChevronRight size={14} />}
                      </button>

                      {openMenu === item.title && (
                        <div className="ml-6 pl-4 border-l border-slate-800 space-y-1">
                          {item.children.map((child) => (
                            <NavLink
                              key={child.title}
                              to={child.path}
                              onClick={() => setMobileMenuOpen(false)}
                              className={({ isActive: childActive }) =>
                                `block px-3 py-2 text-xs font-medium rounded-lg transition
                                ${childActive ? "text-blue-400 bg-blue-500/5 font-semibold" : "text-slate-500"}`
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
            </aside>
          </div>
        )}

        {/* Dynamic Inner Component Content Hub */}
        <main className="flex-1 p-4 -z-10 sm:p-6 overflow-y-auto">
          <div className="min-h-[calc(100vh-112px)]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;