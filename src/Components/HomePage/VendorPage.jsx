import { useEffect, useState } from "react";
import { User, Briefcase, Mail, Star, MapPin, Wrench } from "lucide-react"; // Import Lucide icons

const UserVendorsPage = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    setVendors([
      {
        name: "John's Plumbing",
        image:
          "https://tse4.mm.bing.net/th?id=OIP.tX36supoUyT_GOZtBHrQJgHaHa&pid=Api&P=0&h=180",
        category: "Plumber",
        contact: "john@example.com",
        rating: 4.5,
        areaOfService: "Downtown",
        specialties: ["Leak Repairs", "Pipe Installations"],
      },
      {
        name: "Electric Masters",
        image:
          "https://tse4.mm.bing.net/th?id=OIP.tX36supoUyT_GOZtBHrQJgHaHa&pid=Api&P=0&h=180",
        category: "Electrician",
        contact: "contact@electricmasters.com",
        rating: 4.8,
        areaOfService: "Uptown",
        specialties: ["Wiring", "Lighting Installation"],
      },
      {
        name: "Fix It All",
        image:
          "https://tse4.mm.bing.net/th?id=OIP.tX36supoUyT_GOZtBHrQJgHaHa&pid=Api&P=0&h=180",
        category: "Handyman",
        contact: "info@fixitall.com",
        rating: 4.6,
        areaOfService: "Midtown",
        specialties: ["Furniture Assembly", "Wall Mounting"],
      },
    ]);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-10 space-y-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">
         Vendors List
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor, index) => (
          <div
            key={index}
            className="border rounded-lg shadow p-6 flex flex-col hover:shadow-md transition space-y-2"
          >
            <img
              src={vendor.image}
              alt={vendor.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-300"
            />
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-4 h-4 text-gray-600" />
              {vendor.name}
            </h3>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-gray-500" />
              {vendor.category}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500" />
              {vendor.contact}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              {vendor.rating}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              {vendor.areaOfService}
            </p>
            <p className="text-sm text-gray-700 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-gray-500" />
              <span className="text-gray-800 font-medium">
                {vendor.specialties.join(", ")}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserVendorsPage;
