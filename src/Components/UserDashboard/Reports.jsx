import React, { useState } from "react";

const ReportsPage = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      lead: "lead123",
      date: "2025-04-20",
      details: "Some details about the application",
      type: "Application",
      status: "Approved",
      property: "Casagrand Athens",
      description: "Application for Flat #12A",
    },
    {
      id: 2,
      lead: "lead456",
      date: "2025-04-18",
      details: "Details about the inquiry",
      type: "Inquiry",
      status: "Pending",
      property: "Radiant Villas",
      description: "Inquiry about villa prices",
    },
    {
      id: 3,
      lead: "lead789",
      date: "2025-04-19",
      details: "Application details",
      type: "Application",
      status: "Rejected",
      property: "Relator Heights",
      description: "Application for Flat #22B",
    },
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const [newReport, setNewReport] = useState({
    lead: "",
    date: "",
    details: "",
    type: "Application",
    status: "Approved",
    property: "",
    description: "",
  });

  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredReports = reports.filter((report) => {
    const matchesType = typeFilter === "All" || report.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    const matchesFromDate = !fromDate || report.date >= fromDate;
    const matchesToDate = !toDate || report.date <= toDate;
    return matchesType && matchesStatus && matchesFromDate && matchesToDate;
  });

  const handleDownload = (format) => {
    alert(`Downloaded as ${format}`);
  };

  const handleAddReport = () => {
    const newId = reports.length + 1;
    setReports([
      ...reports,
      {
        id: newId,
        ...newReport,
      },
    ]);
    setNewReport({
      lead: "",
      date: "",
      details: "",
      type: "Application",
      status: "Approved",
      property: "",
      description: "",
    });
    setShowPopup(false);
  };

  const statusColor = {
    Approved: "border-green-500",
    Pending: "border-yellow-500",
    Rejected: "border-red-500",
    Resolved: "border-blue-500",
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Activity Reports</h1>
        <button
          onClick={() => setShowPopup(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Report
        </button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border p-2 rounded-md w-full"
        >
          <option value="All">All Types</option>
          <option value="Application">Application</option>
          <option value="Inquiry">Inquiry</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border p-2 rounded-md w-full"
        >
          <option value="All">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Resolved">Resolved</option>
        </select>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded-md w-full"
        />
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload("PDF")}
            className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700"
          >
            PDF
          </button>
          <button
            onClick={() => handleDownload("CSV")}
            className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700"
          >
            CSV
          </button>
        </div>
      </div>

      {/* Reports */}
      {filteredReports.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className={`border-l-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition duration-300 ${
                statusColor[report.status] || "border-gray-400"
              }`}
            >
              <div className="mb-4">
                <h3 className="font-semibold text-lg">
                  Lead ID: {report.lead}
                </h3>
                <p className="text-gray-500 text-sm">{report.date}</p>
              </div>
              <p>
                <strong>Type:</strong> {report.type}
              </p>
              <p>
                <strong>Status:</strong> {report.status}
              </p>
              <p>
                <strong>Property:</strong> {report.property}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Details:</strong> {report.details}
              </p>
              <p className="mt-2 text-gray-700">
                <strong>Description:</strong> {report.description}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">No reports found.</div>
      )}

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add New Report</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Lead ID"
                value={newReport.lead}
                onChange={(e) =>
                  setNewReport({ ...newReport, lead: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
              <input
                type="date"
                value={newReport.date}
                onChange={(e) =>
                  setNewReport({ ...newReport, date: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
              <textarea
                placeholder="Details"
                value={newReport.details}
                onChange={(e) =>
                  setNewReport({ ...newReport, details: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
              <select
                value={newReport.type}
                onChange={(e) =>
                  setNewReport({ ...newReport, type: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="Application">Application</option>
                <option value="Inquiry">Inquiry</option>
              </select>
              <select
                value={newReport.status}
                onChange={(e) =>
                  setNewReport({ ...newReport, status: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Resolved">Resolved</option>
              </select>
              <input
                type="text"
                placeholder="Property"
                value={newReport.property}
                onChange={(e) =>
                  setNewReport({ ...newReport, property: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
              <textarea
                placeholder="Description"
                value={newReport.description}
                onChange={(e) =>
                  setNewReport({ ...newReport, description: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
