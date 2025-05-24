import React, { useState } from "react";
import { Mail, Phone, Calendar, Plus, X, Home } from "lucide-react";

const propertyOptions = [
  "Yakash Villas",
  "Lakshmi Villas",
  "Golden Residency",
  "Emerald Heights",
  "Royal Gardens",
  "Sunshine Apartments",
];

const UserClients = () => {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: "David Martinez",
      email: "david.martinez@example.com",
      image: "https://i.pravatar.cc/100?u=1",
      interestedProperties: ["Yakash Villas", "Golden Residency"],
      createdAt: "2025-05-07",
    },
    {
      id: 2,
      name: "Jane Smith",
      phone: "(555) 123-4567",
      image: "https://i.pravatar.cc/100?u=2",
      interestedProperties: ["Lakshmi Villas"],
      createdAt: "2025-05-10",
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      image: "https://i.pravatar.cc/100?u=3",
      interestedProperties: [],
      createdAt: "2025-05-15",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    interestedProperties: [],
    createdAt: new Date().toISOString().split("T")[0],
    image: "https://i.pravatar.cc/100",
  });
  const [selectedProperty, setSelectedProperty] = useState("");

  const handleAddProperty = () => {
    if (
      selectedProperty &&
      !newClient.interestedProperties.includes(selectedProperty)
    ) {
      setNewClient({
        ...newClient,
        interestedProperties: [
          ...newClient.interestedProperties,
          selectedProperty,
        ],
      });
    }
  };

  const handleRemoveProperty = (propertyToRemove) => {
    setNewClient({
      ...newClient,
      interestedProperties: newClient.interestedProperties.filter(
        (property) => property !== propertyToRemove
      ),
    });
  };

  const handleAddClient = () => {
    const id = Date.now();
    setClients([
      ...clients,
      {
        ...newClient,
        id,
        // Remove empty contact field
        ...(newClient.email === "" && { email: undefined }),
        ...(newClient.phone === "" && { phone: undefined }),
      },
    ]);
    setShowModal(false);
    setNewClient({
      name: "",
      email: "",
      phone: "",
      interestedProperties: [],
      createdAt: new Date().toISOString().split("T")[0],
      image: "https://i.pravatar.cc/100",
    });
  };

  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Clients</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={16} />
          Add Client
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Add New Client</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newClient.name}
                  onChange={(e) =>
                    setNewClient({ ...newClient, name: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Email</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) =>
                      setNewClient({ ...newClient, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-1">Phone</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) =>
                      setNewClient({ ...newClient, phone: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Created At</label>
                <input
                  type="date"
                  value={newClient.createdAt}
                  onChange={(e) =>
                    setNewClient({ ...newClient, createdAt: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">
                  Interested Properties
                </label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={selectedProperty}
                    onChange={(e) => setSelectedProperty(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  >
                    <option value="">Select a property</option>
                    {propertyOptions.map((property) => (
                      <option key={property} value={property}>
                        {property}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleAddProperty}
                    className="bg-blue-500 text-white px-3 rounded flex items-center"
                    disabled={!selectedProperty}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {newClient.interestedProperties.map((property) => (
                    <div
                      key={property}
                      className="flex items-center justify-between bg-gray-100 p-2 rounded"
                    >
                      <span>{property}</span>
                      <button
                        onClick={() => handleRemoveProperty(property)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={handleAddClient}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
              disabled={!newClient.name}
            >
              Save Client
            </button>
          </div>
        </div>
      )}

      {/* Client Cards */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow p-4 space-y-3"
          >
            <div className="flex items-center space-x-4">
              <img
                src={client.image}
                alt={client.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-medium">{client.name}</p>
                {client.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail size={14} />
                    <span>{client.email}</span>
                  </div>
                )}
                {client.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone size={14} />
                    <span>{client.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-600" />
                <span>Created: {client.createdAt}</span>
              </div>

              {client.interestedProperties.length > 0 && (
                <div className="mt-2 border-t pt-2">
                  <div className="flex items-center gap-2 font-medium">
                    <Home size={16} className="text-green-600" />
                    <span>Interested In:</span>
                  </div>
                  <ul className="mt-1 space-y-1">
                    {client.interestedProperties.map((property) => (
                      <li key={property} className="text-sm pl-5">
                        {property}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserClients;
