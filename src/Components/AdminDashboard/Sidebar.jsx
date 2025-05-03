import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import sidebar1 from "../AdminDashboard/Assets/sidebar1.png";
import sidebar2 from "../AdminDashboard/Assets/sidebar2.png";
import sidebar3 from "../AdminDashboard/Assets/sidebar3.png";
import sidebar4 from "../AdminDashboard/Assets/sidebar4.png";
import sidebar5 from "../AdminDashboard/Assets/sidebar5.png";
import sidebar6 from "../AdminDashboard/Assets/sidebar6.png";
import setting from "../AdminDashboard/Assets/setting.png";
import help from "../AdminDashboard/Assets/help.png";
import logout from "../AdminDashboard/Assets/logout.png";
import sidebarlogo from "../AdminDashboard/Assets/sidebarlogo.png";

// Navigation links
const navItems = [
  { icon: sidebar1, label: "Dashboard", link: "/" },
  { icon: sidebar2, label: "Properties", link: "/propertiespage" },
  { icon: sidebar3, label: "Leads", link: "/leadspage" },
  { icon: sidebar4, label: "Vendors", link: "/vendor" },
  { icon: sidebar5, label: "Calendar", link: "/calender" },
  { icon: sidebar6, label: "Brokers & External Agents", link: "/agentpage" },
];

// Footer links
const footerItems = [
  { icon: setting, label: "Settings", link: "/settings" },
  { icon: help, label: "Help", link: "/help" },
  { icon: logout, label: "Logout", isLogout: true },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // TODO: Add actual logout logic (clear tokens, redirect, etc.)
    console.log("User logged out.");
    navigate("/login");
  };

  return (
    <div className="hidden lg:flex flex-col h-screen w-64 bg-gradient-to-b from-white to-slate-100 shadow-lg p-4 rounded-tr-3xl rounded-br-3xl">
      {/* Logo */}
      <div className="flex items-center mb-8">
        <img src={sidebarlogo} alt="Logo" className="h-12" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map(({ icon, label, link }, idx) => {
            const isActive = location.pathname === link;
            return (
              <li
                key={idx}
                onClick={() => navigate(link)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer group transition duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
                }`}
              >
                <img src={icon} alt={label} className="w-5 h-5" />
                <span>{label}</span>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Navigation */}
      <div className="space-y-2 pt-4">
        {footerItems.map(({ icon, label, link, isLogout }, idx) => (
          <div
            key={idx}
            onClick={() => {
              if (isLogout) {
                handleLogout();
              } else {
                navigate(link);
              }
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition duration-200 ${
              isLogout
                ? "text-red-500 hover:bg-red-50 hover:text-red-600"
                : "text-gray-600 hover:bg-blue-50 hover:text-blue-500"
            }`}
          >
            <img src={icon} alt={label} className="w-5 h-5" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
