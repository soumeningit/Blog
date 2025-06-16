import React, { useState } from "react";
import {
  TbLayoutSidebarRightExpand,
  TbLayoutSidebarRightCollapse,
} from "react-icons/tb";
import { dashboardlinks } from "../Utils/Data";
import { NavLink, Outlet } from "react-router-dom";

function DashboardMain() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-[#22395ad1] ">
      {/* Sidebar */}
      <div
        className={`bg-slate-800 shadow-lg min-h-screen transition-all duration-300 ${
          isSidebarOpen ? "w-64 p-4" : "w-16 p-2"
        }`}
      >
        {/* Toggle Button */}
        <button
          className="text-gray-50 hover:bg-gray-200 p-2 rounded-lg mb-4 w-full flex justify-center"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <TbLayoutSidebarRightExpand size={24} />
          ) : (
            <TbLayoutSidebarRightCollapse size={24} />
          )}
        </button>

        {/* Sidebar Links */}
        <ul className="space-y-3">
          {dashboardlinks.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/dashboard/${item.url}`} // isActive provided by react-router-dom by using Navlink
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-2 rounded-lg transition ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-gray-100 hover:bg-gray-200 hover:text-gray-800"
                  }`
                }
              >
                <span className="text-xl">{<item.icon />}</span>
                {isSidebarOpen && <span>{item.name}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardMain;
