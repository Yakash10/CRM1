import React, { useEffect, useState } from "react";
import ApartmentsData from "../HomePage/ApartmentsData";
import { MapPin, CheckCircle, XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PropertyFilter = () => {
  const [properties, setProperties] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    setProperties(ApartmentsData);
  }, []);

  const handleFilter = (type) => {
    setActiveFilter(type);
    if (type === "All") {
      setProperties(ApartmentsData);
    } else {
      const filtered = ApartmentsData.filter((item) => item.type === type);
      setProperties(filtered);
    }
  };

    const navigate = useNavigate();


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center mt-14">
        Explore Properties
      </h2>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {["All", "Apartments", "Villas", "Plots"].map((type) => (
          <button
            key={type}
            onClick={() => handleFilter(type)}
            className={`px-5 py-2 rounded-full border font-medium transition ${
              activeFilter === type
                ? "bg-orange-600 text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <div
            key={property.id}
            className="rounded-xl hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <img
              src={
                property.images && property.images.length > 0
                  ? property.images[0]
                  : "https://via.placeholder.com/400x300?text=No+Image"
              }
              alt={property.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold mb-1">{property.name}</h3>

              <div className="flex items-center text-gray-600 text-sm mt-2">
                <MapPin className="w-4 h-4 mr-1" />
                {property.location}
              </div>

              <div className="text-gray-600 text-sm mt-2">{property.price}</div>

              <div
                className={`flex items-center font-semibold mt-2 ${
                  property.status === "Available"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {property.status === "Available" ? (
                  <CheckCircle className="w-4 h-4 mr-1" />
                ) : (
                  <XCircle className="w-4 h-4 mr-1" />
                )}
                {property.status}
              </div>

              <button onClick={() => navigate("/Builder")} className="mt-4 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition">
                {property.button || "View Details"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilter;
