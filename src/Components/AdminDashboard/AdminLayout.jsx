// Components/AdminDashboard/AdminLayout.jsx

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Navbar />
        <Outlet /> {/* Renders current page inside layout */}
      </div>
    </div>
  );
};

export default AdminLayout;
