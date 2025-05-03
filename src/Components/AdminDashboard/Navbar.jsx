import { Search, Plus } from "lucide-react";
import searchright from "../AdminDashboard/Assets/searchright.png";
import bellicon from "../AdminDashboard/Assets/bellicon.png";
import navprofile from "../AdminDashboard/Assets/navprofile.png";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow-md">
      {/* Greeting Text */}
      <h1 className="text-lg font-semibold">Good morning, Dyan Bruce</h1>
      {/* Search Bar & Icons */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <div className="relative flex items-center bg-gray-100 rounded-lg px-3 py-1">
          <Search className="w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Quick Search..."
            className="ml-2 w-full bg-transparent outline-none text-sm placeholder-gray-500"
          />
          <img src={searchright} alt="Search" className="w-4 h-4 ml-2" />
        </div>

        {/* Add Icon */}
        <Plus className="w-5 h-5 text-blue-500 cursor-pointer" />

        {/* Notification Icon */}
        <img
          src={bellicon}
          alt="Notifications"
          className="w-5 h-5 cursor-pointer"
        />

        {/* Profile Image */}
        <div className="flex items-center">
          <img
            src={navprofile}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-2 font-medium">Dyan Bruce</span>
        </div>
      </div>
         
    </div>
  );
}
