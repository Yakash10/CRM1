import React, { useState } from "react";
import { Dialog, Menu } from "@headlessui/react";
import {
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  MapPin,
} from "lucide-react";

export default function BrokerAgentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const [brokers, setBrokers] = useState([
    {
      name: "Sarah Williams",
      email: "sarah.williams@proppulse.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      type: "Internal",
      activeListings: 12,
      closedDeals: 45,
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "John Smith",
      email: "john.smith@proppulse.com",
      phone: "(555) 987-6543",
      location: "San Francisco, CA",
      type: "Agent",
      activeListings: 8,
      closedDeals: 37,
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "David Anderson",
      email: "david.anderson@proppulse.com",
      phone: "(555) 456-7890",
      location: "Chicago, IL",
      type: "Broker",
      activeListings: 15,
      closedDeals: 62,
      avatarUrl: "https://randomuser.me/api/portraits/men/79.jpg",
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    type: "",
    activeListings: "",
    closedDeals: "",
    avatarUrl: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (isEdit) {
      setBrokers(
        brokers.map((broker, idx) =>
          idx === editIndex
            ? {
                ...formData,
                activeListings: +formData.activeListings,
                closedDeals: +formData.closedDeals,
              }
            : broker
        )
      );
    } else {
      setBrokers([
        ...brokers,
        {
          ...formData,
          activeListings: +formData.activeListings,
          closedDeals: +formData.closedDeals,
        },
      ]);
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      location: "",
      type: "",
      activeListings: "",
      closedDeals: "",
      avatarUrl: "",
    });
    setIsOpen(false);
    setIsEdit(false);
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setIsEdit(true);
    setEditIndex(index);
    const brokerToEdit = brokers[index];
    setFormData({
      name: brokerToEdit.name,
      email: brokerToEdit.email,
      phone: brokerToEdit.phone,
      location: brokerToEdit.location,
      type: brokerToEdit.type,
      activeListings: brokerToEdit.activeListings.toString(),
      closedDeals: brokerToEdit.closedDeals.toString(),
      avatarUrl: brokerToEdit.avatarUrl,
    });
    setIsOpen(true);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this broker?");
    if (confirmDelete) {
      setBrokers(brokers.filter((_, i) => i !== index));
    }
  };

  const filteredBrokers =
    filterType === "All"
      ? brokers
      : brokers.filter((b) => b.type === filterType);

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="font-semibold text-xl text-gray-800 mb-6">
        Brokers & Agents
      </h1>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search brokers & agents..."
            className="border rounded px-4 py-2 shadow-sm  md:w-64"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm text-sm"
          >
            <option value="All">All Types</option>
            <option value="Broker">Broker</option>
            <option value="Agent">Agent</option>
            <option value="Internal">Internal</option>
          </select>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700 flex items-center gap-2"
        >
          <Plus size={18} /> Add Broker/Agent
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBrokers.map((broker, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-5 relative">
            <Menu as="div" className="absolute right-4 top-4 text-right z-10">
              <Menu.Button className="p-1 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-md z-20">
                <div className="px-4 py-2 font-semibold text-sm text-gray-700">
                  Actions
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleEdit(idx)}
                      className={`w-full px-4 py-2 text-sm flex items-center gap-2 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <Edit size={16} /> Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => handleDelete(idx)}
                      className={`w-full px-4 py-2 text-sm text-red-600 flex items-center gap-2 ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <Trash2 size={16} /> Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>

            <div className="flex flex-col">
              <img
                src={broker.avatarUrl}
                className="w-20 h-20 rounded-full mb-2"
                alt={broker.name}
              />
              <span className="bg-purple-500 text-white w-[100px] text-center text-xs px-3 py-1 rounded-full mb-2">
                {broker.type}
              </span>
              <div className="flex items-center gap-2 text-lg">
                {broker.name}
                <span className="flex items-center text-sm text-gray-500 gap-1">
                  <MapPin size={14} className="text-gray-400" />
                  {broker.location}
                </span>
              </div>
              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <div className="flex items-center  gap-2">
                  <span>📧</span> {broker.email}
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span> {broker.phone}
                </div>
              </div>
              <div className="flex justify-between w-full mt-4 border-t pt-3 text-sm">
                <div className="w-1/2 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.activeListings}
                  </div>
                  <div className="text-gray-500">Listings</div>
                </div>
                <div className="w-1/2 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.closedDeals}
                  </div>
                  <div className="text-gray-500">Deals</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
      >
        <Dialog.Panel className="bg-white p-6 rounded shadow-md w-full max-w-lg mx-4">
          <Dialog.Title className="text-lg font-bold mb-4">
            {isEdit ? "Edit Broker/Agent" : "Add Broker/Agent"}
          </Dialog.Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Name"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Email"
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Phone"
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Location"
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Type</option>
              <option value="Internal">Internal</option>
              <option value="Broker">Broker</option>
              <option value="Agent">Agent</option>
            </select>
            <input
              name="activeListings"
              value={formData.activeListings}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Active Listings"
              type="number"
            />
            <input
              name="closedDeals"
              value={formData.closedDeals}
              onChange={handleChange}
              className="border p-2 rounded"
              placeholder="Closed Deals"
              type="number"
            />
            <input
              name="avatarUrl"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="border p-2 rounded sm:col-span-2"
              placeholder="Avatar URL"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded border"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}
