import React, { useState } from "react";

// Mock data for contractors (replace with API fetch in real use)
const mockContractors = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Michael Johnson" },
];

// Mock data for maintenance requests (replace with API fetch in real use)
const mockRequests = [
  {
    id: 1,
    title: "Fix leaky faucet",
    property: "Apartment A",
    tenant: "Alice",
    date: "2025-04-25",
    status: "Pending",
    priority: "High",
    cost: 0,
  },
  {
    id: 2,
    title: "Paint wall",
    property: "Apartment B",
    tenant: "Bob",
    date: "2025-04-20",
    status: "In Progress",
    priority: "Medium",
    cost: 50,
  },
  {
    id: 3,
    title: "Replace lightbulb",
    property: "Apartment C",
    tenant: "Charlie",
    date: "2025-04-18",
    status: "Completed",
    priority: "Low",
    cost: 20,
  },
];

const MaintenancePage = () => {
  const [requests, setRequests] = useState(mockRequests);
  const [contractors, setContractors] = useState(mockContractors);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    property: "",
    tenant: "",
    priority: "Low",
    description: "",
  });

  const filterRequests = (status, priority) => {
    return requests.filter(
      (req) =>
        (status ? req.status === status : true) &&
        (priority ? req.priority === priority : true)
    );
  };

  const handleSubmitRequest = (data) => {
    if (data.title && data.property && data.tenant && data.description) {
      setRequests([
        ...requests,
        {
          ...data,
          id: requests.length + 1,
          date: new Date().toLocaleDateString(),
          status: "Pending",
          cost: 0,
        },
      ]);
      setFormData({
        title: "",
        property: "",
        tenant: "",
        priority: "Low",
        description: "",
      });
      setFormVisible(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateStatus = (requestId, status) => {
    setRequests(
      requests.map((req) => (req.id === requestId ? { ...req, status } : req))
    );
  };

  const handleAssignContractor = (requestId, contractorId) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, contractorId } : req
      )
    );
  };

  const handleCostChange = (requestId, cost) => {
    setRequests(
      requests.map((req) => (req.id === requestId ? { ...req, cost } : req))
    );
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-xl md:text-2xl font-bold mb-6 text-center sm:text-left">
        Maintenance Management
      </h2>

      <div className="flex flex-wrap gap-4 mb-6 justify-center sm:justify-start">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          onClick={() => setFormVisible(true)}
        >
          Create Request
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          onClick={() => setRequests(filterRequests("Pending", ""))}
        >
          Filter Pending
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
          onClick={() => setRequests(filterRequests("", "High"))}
        >
          Filter High Priority
        </button>
      </div>

      {formVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Create New Maintenance Request
            </h3>
            <CreateMaintenanceRequestForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSubmitRequest}
              onClose={() => setFormVisible(false)}
            />
          </div>
        </div>
      )}

      <MaintenanceRequestsTable
        requests={requests}
        onUpdateStatus={handleUpdateStatus}
        onAssignContractor={handleAssignContractor}
        onCostChange={handleCostChange}
        contractors={contractors}
      />
    </div>
  );
};

const CreateMaintenanceRequestForm = ({
  formData,
  onChange,
  onSubmit,
  onClose,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        placeholder="Request Title"
        className="w-full px-4 py-2 border rounded hover:border-blue-500"
      />
      <input
        type="text"
        name="property"
        value={formData.property}
        onChange={onChange}
        placeholder="Property"
        className="w-full px-4 py-2 border rounded hover:border-blue-500"
      />
      <input
        type="text"
        name="tenant"
        value={formData.tenant}
        onChange={onChange}
        placeholder="Tenant Name"
        className="w-full px-4 py-2 border rounded hover:border-blue-500"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        placeholder="Issue Description"
        className="w-full px-4 py-2 border rounded hover:border-blue-500"
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded hover:border-blue-500"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Create Request
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

const MaintenanceRequestsTable = ({
  requests,
  onUpdateStatus,
  onAssignContractor,
  onCostChange,
  contractors,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 text-sm sm:text-base">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Request Title</th>
            <th className="border px-4 py-2">Property</th>
            <th className="border px-4 py-2">Tenant</th>
            <th className="border px-4 py-2">Request Date</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Cost</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.title}</td>
              <td className="border px-4 py-2">{request.property}</td>
              <td className="border px-4 py-2">{request.tenant || "N/A"}</td>
              <td className="border px-4 py-2">{request.date}</td>
              <td className="border px-4 py-2">{request.status}</td>
              <td className="border px-4 py-2">{request.priority}</td>
              <td className="border px-4 py-2">
                <input
                  type="number"
                  value={request.cost}
                  onChange={(e) => onCostChange(request.id, e.target.value)}
                  className="w-20 px-2 py-1 border rounded"
                />
              </td>
              <td className="border px-4 py-2 space-y-2">
                <div className="flex flex-col sm:flex-row sm:space-x-2 gap-4 sm:gap-0">
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    onClick={() => onUpdateStatus(request.id, "In Progress")}
                  >
                    In Progress
                  </button>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => onUpdateStatus(request.id, "Completed")}
                  >
                    Completed
                  </button>
                </div>
                <AssignContractors
                  contractors={contractors}
                  onAssign={(contractorId) =>
                    onAssignContractor(request.id, contractorId)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const AssignContractors = ({ contractors, onAssign }) => {
  return (
    <div className="text-center">
      <select
        onChange={(e) => onAssign(e.target.value)}
        className="w-full sm:w-auto mt-2 px-4 py-1 border rounded"
      >
        <option value="">Assign Contractor</option>
        {contractors.map((contractor) => (
          <option key={contractor.id} value={contractor.id}>
            {contractor.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MaintenancePage;
