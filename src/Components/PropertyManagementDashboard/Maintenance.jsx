import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";

const defaultForm = {
  property: "",
  description: "",
  status: "Open",
  assignedTo: "",
  createdAt: new Date(),
};

const defaultRequests = [
  {
    id: 1,
    property: "Greenview Apartments",
    description: "The kitchen faucet is leaking and needs to be fixed.",
    status: "Open",
    assignedTo: "Plumber Mike",
    createdAt: "2025-05-01",
  },
  {
    id: 2,
    property: "Sunrise Villas",
    description: "Living room window glass is cracked.",
    status: "In Progress",
    assignedTo: "GlassFix Co.",
    createdAt: "2025-04-30",
  },
  {
    id: 3,
    property: "Palm Residency",
    description: "Air conditioner not cooling properly.",
    status: "Completed",
    assignedTo: "CoolAir Services",
    createdAt: "2025-04-29",
  },
];

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Load default requests only once
    setRequests(defaultRequests);
  }, []);

  useEffect(() => {
    setFiltered(
      requests.filter((r) =>
        r.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, requests]);

  const handleSubmit = () => {
    if (editId) {
      setRequests((prev) =>
        prev.map((r) => (r.id === editId ? { ...form, id: editId } : r))
      );
    } else {
      setRequests((prev) => [...prev, { ...form, id: Date.now() }]);
    }
    resetForm();
  };

  const handleEdit = (req) => {
    setForm(req);
    setEditId(req.id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  const resetForm = () => {
    setForm(defaultForm);
    setIsOpen(false);
    setEditId(null);
  };

  const getStatusBadge = (status) => {
    const base = "text-xs px-2 py-1 rounded-full";
    switch (status) {
      case "Open":
        return <span className={`${base} bg-red-100 text-red-700`}>Open</span>;
      case "In Progress":
        return (
          <span className={`${base} bg-yellow-100 text-yellow-700`}>
            In Progress
          </span>
        );
      case "Completed":
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            Completed
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Maintenance Requests
        </h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Add New Request
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {["All Requests", "Open", "In Progress", "Completed"].map(
          (label, index) => (
            <div
              key={index}
              className="border rounded-lg px-4 py-3 text-center shadow-sm hover:shadow transition"
            >
              <h3 className="text-sm text-gray-600">{label}</h3>
              <p className="text-xl font-semibold">
                {label === "All Requests"
                  ? requests.length
                  : requests.filter((r) => r.status === label).length}
              </p>
            </div>
          )
        )}
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2">
        <input
          type="text"
          placeholder="Search maintenance requests..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" w-[250px] px-4 py-2 border rounded"
        />
      </div>

      {/* Request Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((req) => (
          <div key={req.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold">{req.property}</h3>
              {getStatusBadge(req.status)}
            </div>
            <p className="text-sm text-gray-600 mb-2">{req.description}</p>
            <div className="text-sm text-gray-700 mb-1">
              <strong>Assigned To:</strong> {req.assignedTo || "N/A"}
            </div>
            <div className="text-sm text-gray-700 mb-2">
              <strong>Created At:</strong> {req.createdAt}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(req)}
                className="border px-4 py-2 rounded flex items-center gap-1"
              >
                <Pencil size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(req.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={resetForm}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {editId ? "Edit Request" : "Add New Request"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                placeholder="Property"
                value={form.property}
                onChange={(e) => setForm({ ...form, property: e.target.value })}
                className="border p-2 rounded"
              />
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <input
                placeholder="Assigned To"
                value={form.assignedTo}
                onChange={(e) =>
                  setForm({ ...form, assignedTo: e.target.value })
                }
                className="border p-2 rounded"
              />
              <input
                type="date"
                placeholder="Created At"
                value={form.createdAt}
                onChange={(e) =>
                  setForm({ ...form, createdAt: e.target.value })
                }
                className="border p-2 rounded"
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 rounded w-full mt-4"
              rows={4}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                {editId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceRequests;
