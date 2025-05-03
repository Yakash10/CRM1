import React, { useState } from "react";

const initialClients = [
  {
    id: 1,
    name: "John Broker",
    contact: "john@example.com",
    status: "Active",
    assigned: "Skyline Apartment",
  },
  {
    id: 2,
    name: "Sarah Agent",
    contact: "sarah@example.com",
    status: "Inactive",
    assigned: "None",
  },
];

const propertiesList = ["Skyline Apartment", "Lakeview House", "Palm Villa"];

const UserClients = () => {
  const [clients, setClients] = useState(initialClients);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    contact: "",
    status: "Active",
    assigned: "None",
  });

  const handleAddClient = () => {
    if (!newClient.name || !newClient.contact)
      return alert("Please fill all fields");
    const clientToAdd = { ...newClient, id: Date.now() };
    setClients([...clients, clientToAdd]);
    setNewClient({ name: "", contact: "", status: "Active", assigned: "None" });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  const handleEdit = (id) => {
    const toEdit = clients.find((c) => c.id === id);
    setNewClient(toEdit);
    setIsModalOpen(true);
    handleDelete(id);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-semibold">Clients</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Client
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-4 sm:p-6 rounded-md w-full max-w-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Client</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Client Name"
                value={newClient.name}
                onChange={(e) =>
                  setNewClient({ ...newClient, name: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
              <input
                type="email"
                placeholder="Contact Info"
                value={newClient.contact}
                onChange={(e) =>
                  setNewClient({ ...newClient, contact: e.target.value })
                }
                className="p-2 border rounded w-full"
              />
              <select
                value={newClient.status}
                onChange={(e) =>
                  setNewClient({ ...newClient, status: e.target.value })
                }
                className="p-2 border rounded w-full"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select
                value={newClient.assigned}
                onChange={(e) =>
                  setNewClient({ ...newClient, assigned: e.target.value })
                }
                className="p-2 border rounded w-full"
              >
                <option value="None">Assign Property</option>
                {propertiesList.map((p, i) => (
                  <option key={i} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full border rounded text-sm sm:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Contact</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-left">Assigned Property</th>
              <th className="p-3 border text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="hover:bg-gray-50">
                <td className="p-3 border">{client.name}</td>
                <td className="p-3 border">{client.contact}</td>
                <td className="p-3 border">{client.status}</td>
                <td className="p-3 border">{client.assigned}</td>
                <td className="p-3 border">
                  <div className="flex flex-col sm:flex-row items-center h-full space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      onClick={() => handleEdit(client.id)}
                      className="px-3 py-1 text-xs sm:text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      className="px-3 py-1 text-xs sm:text-sm bg-red-600 text-white rounded hover:bg-red-700 "
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserClients;
