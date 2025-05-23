import React, { useState } from "react";
import {
  MoreVertical,
  Edit2,
  Trash2,
  Send,
  Voicemail,
  Building2,
  History,
} from "lucide-react";

const LeadsPage = () => {
  const [leads, setLeads] = useState([
    {
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "(555) 123-4567",
      status: "New",
      source: "Website Inquiry",
      notes: "Interested in downtown properties",
      createdAt: "2024-05-01",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "Emily Smith",
      email: "emily.smith@example.com",
      phone: "(555) 987-6543",
      status: "In Progress",
      source: "Referral",
      notes: "Looking for luxury condos",
      createdAt: "2024-04-29",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "(555) 222-3333",
      status: "Converted",
      source: "Social Media",
      notes: "Purchased a 3 BHK villa",
      createdAt: "2024-04-25",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState("All");
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    source: "",
    notes: "",
    createdAt: "",
    image: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [editingLeadIndex, setEditingLeadIndex] = useState(null);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);

  const handleChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleSaveLead = () => {
    if (!newLead.name) {
      alert("Name is required.");
      return;
    }

    if (editingLeadIndex !== null) {
      const updated = [...leads];
      updated[editingLeadIndex] = newLead;
      setLeads(updated);
    } else {
      setLeads([
        ...leads,
        {
          ...newLead,
          createdAt: new Date().toISOString().split("T")[0], // Set current date if creating new
        },
      ]);
    }

    resetForm();
    setShowPopup(false);
    setEditingLeadIndex(null);
  };

  const handleEditLead = (index) => {
    setNewLead(leads[index]);
    setEditingLeadIndex(index);
    setShowPopup(true);
    setActionMenuIndex(null);
  };

  const handleDeleteLead = (index) => {
    setLeads(leads.filter((_, i) => i !== index));
    setActionMenuIndex(null);
  };

  const resetForm = () => {
    setNewLead({
      name: "",
      email: "",
      phone: "",
      status: "New",
      source: "",
      notes: "",
      createdAt: "",
      image: "",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "In Progress":
        return "bg-purple-100 text-purple-800";
      case "Converted":
        return "bg-green-100 text-green-800";
      case "Lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredLeads =
    statusFilter === "All"
      ? leads
      : leads.filter((lead) => lead.status === statusFilter);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="p-3 text-lg font-semibold">Lead Management</h1>

      {/* Filter + Add Lead */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded max-w-xs"
        >
          <option value="All">All Statuses</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Converted">Converted</option>
          <option value="Lost">Lost</option>
        </select>
        <button
          onClick={() => {
            resetForm();
            setShowPopup(true);
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          + Add Lead
        </button>
      </div>

      {/* Lead Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {filteredLeads.map((lead, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow relative">
            <div className="absolute top-3 right-3">
              <button
                onClick={() =>
                  setActionMenuIndex(index === actionMenuIndex ? null : index)
                }
                className="text-gray-500 hover:text-gray-700"
              >
                <MoreVertical size={20} />
              </button>
              {actionMenuIndex === index && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-10">
                  <div className="px-4 py-2 font-semibold text-sm text-gray-700 border-b">
                    Actions
                  </div>
                  <button
                    onClick={() => handleEditLead(index)}
                    className="w-full px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100"
                  >
                    <Edit2 size={16} /> Edit Lead
                  </button>
                  <button
                    onClick={() => handleDeleteLead(index)}
                    className="w-full px-4 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-gray-100"
                  >
                    <Trash2 size={16} /> Delete Lead
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <img
                src={lead.image || "https://via.placeholder.com/40"}
                alt={lead.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.source}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2 mt-2">
              <p className="flex items-center gap-2">
                <Send size={16} /> {lead.email}
              </p>
              <p className="flex items-center gap-2">
                <Voicemail size={16} /> {lead.phone}
              </p>
              <p className="flex items-center gap-2">
                <Building2 size={16} /> {lead.notes}
              </p>
              <p className="flex items-center gap-2">
                <History size={16} /> Created: {lead.createdAt}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusStyle(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingLeadIndex !== null ? "Edit Lead" : "Add New Lead"}
              </h2>
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditingLeadIndex(null);
                }}
                className="text-gray-500 hover:text-red-500 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="name">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  value={newLead.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="border p-2 rounded"
                  required
                />
              </div>
              {/* Email */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  value={newLead.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="border p-2 rounded"
                />
              </div>
              {/* Phone */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={newLead.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                  className="border p-2 rounded"
                />
              </div>
              {/* Status */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium " htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newLead.status}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Converted">Converted</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              {/* Source */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="source">
                  Source
                </label>
                <input
                  id="source"
                  name="source"
                  value={newLead.source}
                  onChange={handleChange}
                  placeholder="Source"
                  className="border p-2 rounded"
                />
              </div>
              {/* Notes */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="notes">
                  Notes
                </label>
                <input
                  id="notes"
                  name="notes"
                  value={newLead.notes}
                  onChange={handleChange}
                  placeholder="Notes"
                  className="border p-2 rounded"
                />
              </div>
              {/* Created At */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="createdAt">
                  Created At
                </label>
                <input
                  id="createdAt"
                  name="createdAt"
                  value={newLead.createdAt}
                  onChange={handleChange}
                  placeholder="YYYY-MM-DD"
                  className="border p-2 rounded"
                />
              </div>
              {/* Image URL */}
              <div className="flex flex-col md:col-span-2">
                <label className="mb-1 font-medium" htmlFor="image">
                  Image
                </label>
                <input type="file"
                  id="image"
                  name="image"
                  value={newLead.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="border p-2 rounded"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => {
                  setShowPopup(false);
                  setEditingLeadIndex(null);
                }}
                className="mr-2 px-4 py-2 border rounded text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveLead}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadsPage;
