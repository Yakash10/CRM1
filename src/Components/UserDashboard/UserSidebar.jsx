import React from "react";
import { Link } from "react-router-dom";

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

const UserSidebar = () => {
  return (
    <div className="hidden h-screen lg:flex w-64 bg-white shadow-md flex-col p-4">
      {/* Logo Section */}
      <div className="flex items-center mb-6">
        <img src={sidebarlogo} alt="Logo" className="h-12 mr-2" />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-6">
          <Link
            to="/dashboard"
            className="flex items-center text-blue-500 font-medium cursor-pointer"
          >
            <img src={sidebar1} alt="Dashboard" className="w-5 h-5 mr-3" />
            Dashboard
          </Link>

          <Link
            to="/userproperties"
            className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <img className="w-5 h-5 mr-3" src={sidebar2} alt="Properties" />
            Properties
          </Link>

          <Link
            to="/savedproperties"
            className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <img
              className="w-5 h-5 mr-3"
              src={sidebar3}
              alt="Saved properties"
            />
            Saved properties
          </Link>

          <Link
            to="/reports"
            className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <img className="w-5 h-5 mr-3" src={sidebar4} alt="Reports" />
            Reports
          </Link>

          <Link
            to="/clientpage"
            className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <img className="w-5 h-5 mr-3" src={sidebar5} alt="Clients" />
            Clients
          </Link>

          <Link
            to="/usercalendar"
            className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
          >
            <img className="w-5 h-5 mr-3" src={sidebar6} alt="Calendar" />
            Calendar
          </Link>
        </ul>
      </nav>

      {/* Footer Links */}
      <div className="mt-auto space-y-6">
        <Link
          to="/settings"
          className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
        >
          <img className="w-5 h-5 mr-3" src={setting} alt="Settings" />
          Settings
        </Link>

        <Link
          to="/help"
          className="flex items-center text-gray-700 hover:text-blue-500 cursor-pointer"
        >
          <img className="w-5 h-5 mr-3" src={help} alt="Help" />
          Help
        </Link>

        <Link
          to="/logout"
          className="flex items-center text-red-500 hover:text-red-700 cursor-pointer"
        >
          <img className="w-5 h-5 mr-3" src={logout} alt="Logout" />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default UserSidebar;
