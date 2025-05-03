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
    <div className="bg-gray-100 p-8">
      <h1 className="text-2xl mb-8">
        Explore Properties
      </h1>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <input
          type="text"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 w-full md:w-1/3 rounded-lg shadow-lg focus:outline-none "
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 w-full md:w-1/4 rounded-lg shadow-lg focus:outline-none"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
        </select>
      </div>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-xl overflow-hidden"
          >
            <img
              src={`https://tse4.mm.bing.net/th?id=OIP.rvulpHWMOQa7PnEm-PqohwHaEJ&pid=Api&P=0&h=180=${property.name}`}
              alt={property.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl p-1 font-semibold text-gray-800 mb-3">
                {property.name}
              </h2>
              <p className="text-sm text-gray-500 p-1 flex gap-2 mb-1">
                <span className="font-semibold text-gray-700">Location:</span>{" "}
                {property.location}
              </p>
              <p className="text-sm text-gray-500 p-1 flex gap-2 mb-1">
                <span className="font-semibold text-gray-700">Type:</span>{" "}
                {property.type}
              </p>
              <p className="text-sm text-gray-500 flex gap-2 p-1 mb-1">
                <span className="font-semibold text-gray-700">Price:</span>{" "}
                {property.price}
              </p>
              <p className="text-sm flex gap-2 font-medium p-1 mb-4">
                <span className="font-semibold text-gray-700">Status:</span>
                <span
                  className={`text-${
                    property.status === "Available" ? "green" : "red"
                  }-500`}
                >
                  {property.status}
                </span>
              </p>
              <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-md">
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
