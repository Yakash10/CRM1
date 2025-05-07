import React, { useState } from "react";
import {
  HomeModernIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function PropertyManager() {
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBuilder, setFilterBuilder] = useState("All");

  const [properties, setProperties] = useState([
    {
      title: "Modern Downtown Apartment",
      address: "123 Main St, Anytown, USA",
      price: "$425,000",
      buildername: "Casagrand",
      location: "Chennai",
      bed: 2,
      bath: 2,
      sqft: 1250,
      type: "For Sale",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Luxury Waterfront Villa",
      address: "456 Ocean Dr, Beachville, USA",
      price: "$1,250,000",
      buildername: "Radiance",
      location: "Salem",
      bed: 4,
      bath: 3,
      sqft: 3200,
      type: "For Sale",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
    },
    {
      title: "Cozy Suburban House",
      address: "789 Park Ave, Suburbia, USA",
      price: "$675,000",
      buildername: "Relator",
      location: "Chennai",
      bed: 3,
      bath: 2,
      sqft: 1800,
      type: "For Sale",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    buildername: "Casagrand",
    location: "Chennai",
    bed: "",
    bath: "",
    sqft: "",
    type: "For Sale",
    status: "Active",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0] ? URL.createObjectURL(files[0]) : null,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = { ...formData };

    if (editingIndex !== null) {
      const updated = [...properties];
      updated[editingIndex] = newProperty;
      setProperties(updated);
    } else {
      setProperties([...properties, newProperty]);
    }

    setShowModal(false);
    setEditingIndex(null);
    setFormData({
      title: "",
      address: "",
      price: "",
      buildername: "Casagrand",
      location: "Chennai",
      bed: "",
      bath: "",
      sqft: "",
      type: "For Sale",
      status: "Active",
      image: null,
    });
  };

  const handleEdit = (index) => {
    const prop = properties[index];
    setFormData({ ...prop });
    setEditingIndex(index);
    setShowModal(true);
    setDropdownOpenIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...properties];
    updated.splice(index, 1);
    setProperties(updated);
    setDropdownOpenIndex(null);
  };

  const filteredProperties = properties.filter((prop) => {
    const typeMatch = filterType === "All" || prop.type === filterType;
    const statusMatch = filterStatus === "All" || prop.status === filterStatus;
    const builderMatch =
      filterBuilder === "All" || prop.buildername === filterBuilder;
    return typeMatch && statusMatch && builderMatch;
  });

  return (
    <div className="p-4 sm:p-6">
      <p className="p-3 font-semibold text-lg">Properties</p>
      {/* Filters and Button */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between items-start lg:items-center mb-6 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Sold">Sold</option>
          </select>

          <select
            value={filterBuilder}
            onChange={(e) => setFilterBuilder(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Builders</option>
            <option value="Casagrand">Casagrand</option>
            <option value="Radiance">Radiance</option>
            <option value="Relator">Relator</option>
          </select>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setEditingIndex(null);
            setFormData({
              title: "",
              address: "",
              price: "",
              buildername: "Casagrand",
              location: "Chennai",
              bed: "",
              bath: "",
              sqft: "",
              type: "For Sale",
              status: "Active",
              image: null,
            });
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Property
        </button>
      </div>
      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
          >
            <h2 className="text-lg font-bold mb-4">
              {editingIndex !== null ? "Edit Property" : "Add Property"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded col-span-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded col-span-2"
              />
              <input
                type="text"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="bed"
                placeholder="Bed"
                value={formData.bed}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="bath"
                placeholder="Bath"
                value={formData.bath}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <input
                type="number"
                name="sqft"
                placeholder="Sqft"
                value={formData.sqft}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded"
              />
              <select
                name="buildername"
                value={formData.buildername}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                <option value="Casagrand">Casagrand</option>
                <option value="Radiance">Radiance</option>
                <option value="Relator">Relator</option>
              </select>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              >
                <option value="Chennai">Chennai</option>
                <option value="Salem">Salem</option>
                <option value="Delhi">Delhi</option>
              </select>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                accept="image/*"
                className="col-span-2"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProperties.map((prop, index) => (
          <div key={index} className="bg-white rounded-lg shadow relative">
            <div className="relative">
              <img
                src={prop.image}
                alt={prop.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <span className="absolute top-2 left-2 bg-white bg-opacity-80 text-gray-800 text-xs px-2 py-1 rounded shadow">
                {prop.buildername}
              </span>
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs text-white rounded ${
                  prop.type === "For Sale" ? "bg-purple-600" : "bg-blue-500"
                }`}
              >
                {prop.type}
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{prop.title}</h3>
                  <p className="text-sm mt-1 text-gray-600">
                    {prop.address}, {prop.location}
                  </p>
                </div>
                <button
                  onClick={() =>
                    setDropdownOpenIndex(
                      dropdownOpenIndex === index ? null : index
                    )
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  ⋮
                </button>
                {dropdownOpenIndex === index && (
                  <div className="absolute right-4 top-10 w-40 bg-white border rounded shadow z-10">
                    <button
                      onClick={() => handleEdit(index)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xl font-bold mt-2">{prop.price}</p>
              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span className="flex items-center gap-1">
                  <HomeModernIcon className="h-4 w-4" />
                  {prop.bed} Bed
                </span>
                <span className="flex items-center gap-1">
                  <BuildingOfficeIcon className="h-4 w-4" />
                  {prop.bath} Bath
                </span>
                <span className="flex items-center gap-1">
                  <Squares2X2Icon className="h-4 w-4" />
                  {prop.sqft} sqft
                </span>
              </div>
              <span className="inline-block mt-3 px-2 py-1 text-xs rounded bg-green-100 text-green-800">
                {prop.status}
              </span>
            </div>
          </div>
        ))}
      </div>
         
    </div>
  );
}
