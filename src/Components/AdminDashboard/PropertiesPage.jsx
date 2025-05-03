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

  const [properties, setProperties] = useState([
    {
      title: "Modern Downtown Apartment",
      address: "123 Main St, Anytown, USA",
      price: "$425,000",
      beds: 2,
      baths: 2,
      sqft: 1250,
      type: "For Sale",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
    },
    {
      title: "Luxury Waterfront Villa",
      address: "456 Ocean Dr, Beachville, USA",
      price: "$1,250,000",
      beds: 4,
      baths: 3.5,
      sqft: 3200,
      type: "For Sale",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
    },
    {
      title: "Cozy Studio in Arts District",
      address: "789 Gallery Row, Artsville, USA",
      price: "$1,800/mo",
      beds: 0,
      baths: 1,
      sqft: 650,
      type: "For Rent",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    beds: "",
    baths: "",
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
    const newProperty = {
      ...formData,
      price: formData.price.startsWith("$")
        ? formData.price
        : `$${formData.price}`,
    };

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
      beds: "",
      baths: "",
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
    return typeMatch && statusMatch;
  });

  return (
    <div className="p-4 sm:p-6">
      <p className="p-3 font-semibold text-lg">Properties</p>

      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between items-start lg:items-center mb-6">
        <input
          type="text"
          placeholder="Search properties..."
          className="border px-4 py-2 rounded"
        />

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

          <button
            onClick={() => {
              setShowModal(true);
              setEditingIndex(null);
              setFormData({
                title: "",
                address: "",
                price: "",
                beds: "",
                baths: "",
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
      </div>

      {/* Modal remains unchanged */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-semibold mb-4">
              {editingIndex !== null ? "Edit" : "Add"} Property
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                "title",
                "address",
                "price",
                "beds",
                "baths",
                "sqft",
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              ))}
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Sold">Sold</option>
              </select>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-600 px-4 py-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded"
                >
                  {editingIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
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
                  <p className="text-sm mt-1 text-gray-600">{prop.address}</p>
                </div>
                <div className="relative">
                  <button
                    onClick={() =>
                      setDropdownOpenIndex(
                        dropdownOpenIndex === index ? null : index
                      )
                    }
                    className="text-gray-500 text-lg hover:text-gray-700"
                  >
                    ⋮
                  </button>
                  {dropdownOpenIndex === index && (
                    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                      <p className="px-4 py-2 font-semibold border-b">Actions</p>
                      <button
                        onClick={() => handleEdit(index)}
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100 w-full"
                      >
                        ✏️ <span className="ml-2">Edit Property</span>
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                      >
                        🗑️ <span className="ml-2">Delete Property</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-xl font-bold mt-2">{prop.price}</p>
              <div className="flex justify-between text-sm text-gray-700 mt-2">
                <span className="flex items-center gap-1">
                  <HomeModernIcon className="h-4 w-4" />
                  {prop.beds} Beds
                </span>
                <span className="flex items-center gap-1">
                  <BuildingOfficeIcon className="h-4 w-4" />
                  {prop.baths} Baths
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
