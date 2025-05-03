import React, { useState } from "react";
import { MoreVertical, Edit2, Trash2 } from "lucide-react";

const getInitials = (name) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const LeadsPage = () => {
  const [leads, setLeads] = useState([
    {
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "(555) 123-4567",
      status: "New",
      source: "Website Inquiry",
      assignedTo: "Sarah Williams",
      propertyInterest: "2 Bedroom Apartment, Downtown",
      createdAt: "2024-05-01",
      lastActivity: "2 hours ago",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "Emily Smith",
      email: "emily.smith@example.com",
      phone: "(555) 987-6543",
      status: "Contacted",
      source: "Referral",
      assignedTo: "John Carter",
      propertyInterest: "Luxury Condo, Uptown",
      createdAt: "2024-04-29",
      lastActivity: "1 day ago",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "(555) 222-3333",
      status: "Qualified",
      source: "Social Media",
      assignedTo: "Laura Green",
      propertyInterest: "3 BHK Villa, Suburbs",
      createdAt: "2024-04-25",
      lastActivity: "3 days ago",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
  ]);

  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    status: "New",
    source: "",
    assignedTo: "",
    propertyInterest: "",
    createdAt: "",
    lastActivity: "",
    image: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [editingLeadIndex, setEditingLeadIndex] = useState(null);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);

  const handleChange = (e) => {
    setNewLead({ ...newLead, [e.target.name]: e.target.value });
  };

  const handleSaveLead = () => {
    if (!newLead.name || !newLead.email) {
      alert("Name and email are required.");
      return;
    }

    if (editingLeadIndex !== null) {
      const updated = [...leads];
      updated[editingLeadIndex] = newLead;
      setLeads(updated);
    } else {
      setLeads([...leads, newLead]);
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
      assignedTo: "",
      propertyInterest: "",
      createdAt: "",
      lastActivity: "",
      image: "",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800";
      case "Contacted":
        return "bg-purple-100 text-purple-800";
      case "Qualified":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="p-3 text-lg font-semibold">Lead Management</h1>
      <div className="flex justify-between mb-4">
        <input placeholder="Search leads..." className="border p-2 rounded" />
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

      <div className="grid md:grid-cols-3 gap-4">
        {leads.map((lead, index) => (
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
                <h3 className="text-lg font-semibold">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.source}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 space-y-2 mt-2">
              <p>📧 {lead.email}</p>
              <p>📞 {lead.phone}</p>
              <p>🏘️ {lead.propertyInterest}</p>
              <p>📅 Last activity: {lead.lastActivity}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold ${getStatusStyle(
                  lead.status
                )}`}
              >
                {lead.status}
              </span>
              <span className="text-sm text-gray-600">
                Assigned to: <strong>{lead.assignedTo}</strong>
              </span>
            </div>
          </div>
        ))}
      </div>

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
                &times;
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                value={newLead.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 rounded"
              />
              <input
                name="email"
                value={newLead.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
              />
              <input
                name="phone"
                value={newLead.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={newLead.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
              </select>
              <input
                name="source"
                value={newLead.source}
                onChange={handleChange}
                placeholder="Source"
                className="border p-2 rounded"
              />
              <input
                name="assignedTo"
                value={newLead.assignedTo}
                onChange={handleChange}
                placeholder="Assigned To"
                className="border p-2 rounded"
              />
              <input
                name="propertyInterest"
                value={newLead.propertyInterest}
                onChange={handleChange}
                placeholder="Property Interest"
                className="border p-2 rounded"
              />
              <input
                name="createdAt"
                value={newLead.createdAt}
                onChange={handleChange}
                placeholder="Created At"
                className="border p-2 rounded"
              />
              <input
                name="lastActivity"
                value={newLead.lastActivity}
                onChange={handleChange}
                placeholder="Last Activity"
                className="border p-2 rounded"
              />
              <input
                name="image"
                value={newLead.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="border p-2 rounded col-span-2"
              />
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowPopup(false)}
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
