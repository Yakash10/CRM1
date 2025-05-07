// Components/AdminDashboard/AdminLayout.jsx

import UserSidebar from "./UserSidebar";
import UserNavbar from "./UserNavbar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-4">
        <UserNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
