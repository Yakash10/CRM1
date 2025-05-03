import React, { useState } from "react";
import { Pencil, Trash } from "lucide-react";

const PropertiesPage = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Green Villa",
      location: "Los Angeles",
      type: "Villa",
      price: 500000,
      status: "Available",
    },
    {
      id: 2,
      name: "Ocean Apartment",
      location: "Miami",
      type: "Apartment",
      price: 300000,
      status: "Sold",
    },
    {
      id: 3,
      name: "Sunny House",
      location: "San Francisco",
      type: "House",
      price: 750000,
      status: "Available",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newProperty, setNewProperty] = useState({
    name: "",
    location: "",
    type: "",
    price: "",
    status: "Available",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [editingProperty, setEditingProperty] = useState(null);

  const handleAddProperty = () => {
    setProperties([
      ...properties,
      {
        id: Date.now(),
        ...newProperty,
      },
    ]);
    setModalOpen(false);
    setNewProperty({
      name: "",
      location: "",
      type: "",
      price: "",
      status: "Available",
    });
  };

  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setNewProperty(property);
    setModalOpen(true);
  };

  const handleSaveEdit = () => {
    setProperties(
      properties.map((property) =>
        property.id === editingProperty.id ? newProperty : property
      )
    );
    setModalOpen(false);
    setEditingProperty(null);
    setNewProperty({
      name: "",
      location: "",
      type: "",
      price: "",
      status: "Available",
    });
  };

  const handleDeleteProperty = (id) => {
    setProperties(properties.filter((property) => property.id !== id));
  };

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold">Properties</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            className="border p-2 rounded w-full sm:w-64"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => setModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add New Property
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left whitespace-nowrap">Property Name</th>
              <th className="p-3 text-left whitespace-nowrap">Location</th>
              <th className="p-3 text-left whitespace-nowrap">Type</th>
              <th className="p-3 text-left whitespace-nowrap">Price</th>
              <th className="p-3 text-left whitespace-nowrap">Status</th>
              <th className="p-3 text-left whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id} className="border-b">
                <td className="p-3">{property.name}</td>
                <td className="p-3">{property.location}</td>
                <td className="p-3">{property.type}</td>
                <td className="p-3">${property.price}</td>
                <td className="p-3">{property.status}</td>
                <td className="p-3">
                  <div className="flex space-x-2">
                    <Pencil
                      className="text-yellow-600 w-4 h-4 cursor-pointer"
                      onClick={() => handleEditProperty(property)}
                    />
                    <Trash
                      className="text-red-600 w-4 h-4 cursor-pointer"
                      onClick={() => handleDeleteProperty(property.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {editingProperty ? "Edit Property" : "Add New Property"}
            </h2>
            <div className="space-y-3">
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Property Name"
                value={newProperty.name}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, name: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Location"
                value={newProperty.location}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, location: e.target.value })
                }
              />
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Type"
                value={newProperty.type}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, type: e.target.value })
                }
              />
              <input
                type="number"
                className="w-full border p-2 rounded"
                placeholder="Price"
                value={newProperty.price}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, price: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
                value={newProperty.status}
                onChange={(e) =>
                  setNewProperty({ ...newProperty, status: e.target.value })
                }
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
                onClick={editingProperty ? handleSaveEdit : handleAddProperty}
              >
                {editingProperty ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
