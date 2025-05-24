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
  // Sample users data for the assignedTo select field
  const users = [
    { id: "user1", name: "John Doe" },
    { id: "user2", name: "Jane Smith" },
    { id: "user3", name: "Robert Johnson" },
    { id: "user4", name: "Emily Davis" },
  ];

  const [leads, setLeads] = useState([
    {
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      phone: "(555) 123-4567",
      status: "new",
      source: "website",
      interestedIn: {
        builder: null,
        project: null,
        unit: null,
      },
      assignedTo: "user2", // Now using ID from users array
      notes: [
        {
          note: "Interested in downtown properties",
          date: "2024-05-01",
          addedBy: null,
        },
      ],
      createdAt: "2024-05-01",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "Emily Smith",
      email: "emily.smith@example.com",
      phone: "(555) 987-6543",
      status: "contacted",
      source: "referral",
      interestedIn: {
        builder: null,
        project: null,
        unit: null,
      },
      assignedTo: "user1",
      notes: [
        {
          note: "Looking for luxury condos",
          date: "2024-04-29",
          addedBy: null,
        },
      ],
      createdAt: "2024-04-29",
      image:
        "https://www.pngitem.com/pimgs/m/404-4042710_circle-profile-picture-png-transparent-png.png",
    },
    {
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "(555) 222-3333",
      status: "converted",
      source: "other",
      interestedIn: {
        builder: null,
        project: null,
        unit: null,
      },
      assignedTo: "user3",
      notes: [
        {
          note: "Purchased a 3 BHK villa",
          date: "2024-04-25",
          addedBy: null,
        },
      ],
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
    status: "new",
    source: "website",
    interestedIn: {
      builder: null,
      project: null,
      unit: null,
    },
    assignedTo: "",
    notes: [],
    createdAt: "",
    image: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [editingLeadIndex, setEditingLeadIndex] = useState(null);
  const [actionMenuIndex, setActionMenuIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewLead((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestedInChange = (e) => {
    const { name, value } = e.target;
    setNewLead(prev => ({
      ...prev,
      interestedIn: {
        ...prev.interestedIn,
        [name]: value || null
      }
    }));
  };

  const handleNoteChange = (e) => {
    const note = e.target.value;
    setNewLead(prev => ({
      ...prev,
      notes: note ? [{
        note,
        date: new Date().toISOString().split("T")[0],
        addedBy: null
      }] : []
    }));
  };

  const handleSaveLead = () => {
    if (!newLead.name) {
      alert("Name is required.");
      return;
    }

    if (editingLeadIndex !== null) {
      const updatedLeads = leads.map((lead, index) =>
        index === editingLeadIndex ? newLead : lead
      );
      setLeads(updatedLeads);
    } else {
      setLeads([
        ...leads,
        {
          ...newLead,
          notes: newLead.notes.length > 0 ? newLead.notes : [{
            note: "Initial contact",
            date: new Date().toISOString().split("T")[0],
            addedBy: null,
          }],
          createdAt: newLead.createdAt || new Date().toISOString().split("T")[0],
        },
      ]);
    }

    resetForm();
    setShowPopup(false);
    setEditingLeadIndex(null);
  };

  const handleEditLead = (index) => {
    setNewLead(JSON.parse(JSON.stringify(leads[index])));
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
      status: "new",
      source: "website",
      interestedIn: {
        builder: null,
        project: null,
        unit: null,
      },
      assignedTo: "",
      notes: [],
      createdAt: "",
      image: "",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-purple-100 text-purple-800";
      case "interested":
        return "bg-yellow-100 text-yellow-800";
      case "converted":
        return "bg-green-100 text-green-800";
      case "not interested":
        return "bg-gray-100 text-gray-800";
      case "lost":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUserName = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : "Unassigned";
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
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="interested">Interested</option>
          <option value="not interested">Not Interested</option>
          <option value="converted">Converted</option>
          <option value="lost">Lost</option>
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
                <p className="text-sm text-gray-500 capitalize">{lead.source}</p>
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
                <Building2 size={16} /> 
                {lead.notes.length > 0 ? lead.notes[0].note : "No notes"}
              </p>
              <p className="flex items-center gap-2">
                <History size={16} /> Created: {lead.createdAt}
              </p>
              <p className="flex items-center gap-2">
                Assigned To: {getUserName(lead.assignedTo)}
              </p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span
                className={`text-xs px-2 py-1 rounded-full font-semibold capitalize ${getStatusStyle(
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
                <label className="mb-1 font-medium" htmlFor="status">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={newLead.status}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="interested">Interested</option>
                  <option value="not interested">Not Interested</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>
              {/* Source */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="source">
                  Source
                </label>
                <select
                  id="source"
                  name="source"
                  value={newLead.source}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="walk-in">Walk-in</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {/* Assigned To - Now a select field */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="assignedTo">
                  Assigned To
                </label>
                <select
                  id="assignedTo"
                  name="assignedTo"
                  value={newLead.assignedTo}
                  onChange={handleChange}
                  className="border p-2 rounded"
                >
                  <option value="">Select User</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
              {/* Interested In - Builder */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="builder">
                  Interested In - Builder
                </label>
                <input
                  id="builder"
                  name="builder"
                  value={newLead.interestedIn.builder || ""}
                  onChange={handleInterestedInChange}
                  placeholder="Builder "
                  className="border p-2 rounded"
                />
              </div>
              {/* Interested In - Project */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="project">
                  Interested In - Project
                </label>
                <input
                  id="project"
                  name="project"
                  value={newLead.interestedIn.project || ""}
                  onChange={handleInterestedInChange}
                  placeholder="Project"
                  className="border p-2 rounded"
                />
              </div>
              {/* Interested In - Unit */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="unit">
                  Interested In - Unit 
                </label>
                <input
                  id="unit"
                  name="unit"
                  value={newLead.interestedIn.unit || ""}
                  onChange={handleInterestedInChange}
                  placeholder="Unit "
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
                  value={newLead.notes.length > 0 ? newLead.notes[0].note : ""}
                  onChange={handleNoteChange}
                  placeholder="Initial note"
                  className="border p-2 rounded"
                />
              </div>
              {/* Created At */}
              <div className="flex flex-col">
                <label className="mb-1 font-medium" htmlFor="createdAt">
                  Created At
                </label>
                <input
                type="date"
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
                <input
                type="file"
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