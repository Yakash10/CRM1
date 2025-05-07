import React, { useState } from "react";

const initialProperties = [
  {
    id: 1,
    name: "Modern Villa",
    location: "Los Angeles",
    type: "Villa",
    price: "$1,200,000",
    status: "Available",
  },
  {
    id: 2,
    name: "City Apartment",
    location: "New York",
    type: "Apartment",
    price: "$850,000",
    status: "Sold",
  },
  {
    id: 3,
    name: "Beach House",
    location: "Miami",
    type: "House",
    price: "$950,000",
    status: "Available",
  },
];

const UserProperties = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = initialProperties.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className=" p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">Explore Properties</h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-lg border shadow focus:outline-none"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-2  rounded-lg border shadow focus:outline-none"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((property) => (
          <div key={property.id} className="p-4">
            <img
              src={`https://tse4.mm.bing.net/th?id=OIP.rvulpHWMOQa7PnEm-PqohwHaEJ&pid=Api&P=0&h=180=${property.name}`}
              alt={property.name}
              className="w-full h-56 object-cover rounded-lg"
            />
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {property.name}
              </h2>

              {/* Info Row */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-700">
                <span>📍 {property.location}</span>
                <span>🏠 {property.type}</span>
                <span>💰 {property.price}</span>
              </div>

              {/* Status */}
              <div className="mt-2 text-sm font-semibold flex items-center gap-1">
                <span>{property.status === "Available" ? "✅" : "❌"}</span>
                <span
                  className={`${
                    property.status === "Available"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {property.status}
                </span>
              </div>

              <button className="mt-4 w-[150px] text-center py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                View Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProperties;
