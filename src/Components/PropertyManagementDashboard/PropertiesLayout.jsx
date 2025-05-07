// Components/AdminDashboard/AdminLayout.jsx

import PropertySidebar from "./PropertySidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const PropertiesLayout = () => {
  return (
    <div className="flex">
      <PropertySidebar />
      <div className="flex-1 p-4">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default PropertiesLayout;
