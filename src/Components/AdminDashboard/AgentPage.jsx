import React, { useState } from "react";
import { Dialog, Menu } from "@headlessui/react";
import { Plus, MoreVertical, Edit, Trash2, MapPin } from "lucide-react";

export default function AgentPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const [brokers, setBrokers] = useState([
    {
      user: "user_id_1",
      companyName: "Williams Realty",
      email: "sarah.williams@proppulse.com",
      phone: "(555) 123-4567",
      location: "New York, NY",
      selectType: "Internal",
      activeListings: 12,
      closedDeals: 45,
      avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
      commissionRate: 2.5,
      properties: []
    },
    {
      user: "user_id_2",
      companyName: "Smith Properties",
      email: "john.smith@proppulse.com",
      phone: "(555) 987-6543",
      location: "San Francisco, CA",
      selectType: "Agent",
      activeListings: 8,
      closedDeals: 37,
      avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
      commissionRate: 3.0,
      properties: []
    },
    {
      user: "user_id_3",
      companyName: "Anderson Brokers",
      email: "david.anderson@proppulse.com",
      phone: "(555) 456-7890",
      location: "Chicago, IL",
      selectType: "Broker",
      activeListings: 15,
      closedDeals: 62,
      avatarUrl: "https://randomuser.me/api/portraits/men/79.jpg",
      commissionRate: 2.8,
      properties: []
    },
  ]);

  const [formData, setFormData] = useState({
    user: "",
    companyName: "",
    email: "",
    phone: "",
    location: "",
    selectType: "",
    activeListings: "",
    closedDeals: "",
    avatarUrl: "",
    commissionRate: "",
    properties: []
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.companyName || !formData.commissionRate) {
      alert("Company Name and Commission Rate are required fields");
      return;
    }

    if (isEdit) {
      setBrokers(
        brokers.map((broker, idx) =>
          idx === editIndex
            ? {
                ...broker, // Keep all existing fields
                ...formData, // Override with form data
                activeListings: +formData.activeListings || broker.activeListings,
                closedDeals: +formData.closedDeals || broker.closedDeals,
                commissionRate: +formData.commissionRate,
                properties: formData.properties || broker.properties
              }
            : broker
        )
      );
    } else {
      setBrokers([
        ...brokers,
        {
          ...formData,
          activeListings: +formData.activeListings || 0,
          closedDeals: +formData.closedDeals || 0,
          commissionRate: +formData.commissionRate,
          properties: formData.properties || []
        },
      ]);
    }

    setFormData({
      user: "",
      companyName: "",
      email: "",
      phone: "",
      location: "",
      selectType: "",
      activeListings: "",
      closedDeals: "",
      avatarUrl: "",
      commissionRate: "",
      properties: []
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
      user: brokerToEdit.user,
      companyName: brokerToEdit.companyName,
      email: brokerToEdit.email,
      phone: brokerToEdit.phone,
      location: brokerToEdit.location,
      selectType: brokerToEdit.selectType,
      activeListings: brokerToEdit.activeListings.toString(),
      closedDeals: brokerToEdit.closedDeals.toString(),
      avatarUrl: brokerToEdit.avatarUrl,
      commissionRate: brokerToEdit.commissionRate.toString(),
      properties: brokerToEdit.properties
    });
    setIsOpen(true);
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this broker?"
    );
    if (confirmDelete) {
      setBrokers(brokers.filter((_, i) => i !== index));
    }
  };

  const filteredBrokers =
    filterType === "All"
      ? brokers
      : brokers.filter((b) => b.selectType === filterType);

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
          onClick={() => {
            setIsEdit(false);
            setFormData({
              user: "",
              companyName: "",
              email: "",
              phone: "",
              location: "",
              selectType: "",
              activeListings: "",
              closedDeals: "",
              avatarUrl: "",
              commissionRate: "",
              properties: []
            });
            setIsOpen(true);
          }}
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
                alt={broker.companyName}
              />
              <span className="bg-purple-500 text-white w-[100px] text-center text-xs px-3 py-1 rounded-full mb-2">
                {broker.selectType}
              </span>
              <div className="flex items-center gap-2 text-lg">
                {broker.companyName}
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
                <div className="w-1/3 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.activeListings}
                  </div>
                  <div className="text-gray-500">Listings</div>
                </div>
                <div className="w-1/3 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.closedDeals}
                  </div>
                  <div className="text-gray-500">Deals</div>
                </div>
                <div className="w-1/3 text-center">
                  <div className="text-purple-700 font-bold">
                    {broker.commissionRate}%
                  </div>
                  <div className="text-gray-500">Commission</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal Dialog */}
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
            {/* <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700"
              >
                User ID
              </label>
              <input
                id="user"
                name="user"
                value={formData.user}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="User ID"
              />
            </div> */}
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name*
              </label>
              <input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Company Name"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Email"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Phone"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Location"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="selectType"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="selectType"
                name="selectType"
                value={formData.selectType}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select Type</option>
                <option value="Internal">Internal</option>
                <option value="Broker">Broker</option>
                <option value="Agent">Agent</option>
              </select>
            </div>
            <div className="space-y-1">
              <label
                htmlFor="commissionRate"
                className="block text-sm font-medium text-gray-700"
              >
                Commission Rate*
              </label>
              <input
                id="commissionRate"
                name="commissionRate"
                value={formData.commissionRate}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Commission Rate"
                type="number"
                step="0.1"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="activeListings"
                className="block text-sm font-medium text-gray-700"
              >
                Active Listings
              </label>
              <input
                id="activeListings"
                name="activeListings"
                value={formData.activeListings}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Active Listings"
                type="number"
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="closedDeals"
                className="block text-sm font-medium text-gray-700"
              >
                Closed Deals
              </label>
              <input
                id="closedDeals"
                name="closedDeals"
                value={formData.closedDeals}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Closed Deals"
                type="number"
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label
                htmlFor="avatarUrl"
                className="block text-sm font-medium text-gray-700"
              >
                Avatar Image
              </label>
              <input
              type="file"
                id="avatarUrl"
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleChange}
                className="border p-2 rounded w-full"
                placeholder="Avatar URL"
              />
            </div>
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
              {isEdit ? "Update" : "Save"}
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
}