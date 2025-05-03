import React, { useState } from "react";

const initialReports = [
  { id: 1, date: "2025-04-20", type: "Application", status: "Approved" },
  { id: 2, date: "2025-04-18", type: "Inquiry", status: "Pending" },
  { id: 3, date: "2025-04-15", type: "Application", status: "Rejected" },
  { id: 4, date: "2025-04-12", type: "Inquiry", status: "Resolved" },
];

const ReportsPage = () => {
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filteredReports = initialReports.filter((report) => {
    const matchesType = typeFilter === "All" || report.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    const matchesFromDate = !fromDate || report.date >= fromDate;
    const matchesToDate = !toDate || report.date <= toDate;
    return matchesType && matchesStatus && matchesFromDate && matchesToDate;
  });

  const handleDownload = (format) => {
    alert(`Downloaded as ${format}`);
    // You can integrate libraries like jsPDF or react-csv for real downloads
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Activity Reports</h1>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Types</option>
          <option value="Application">Application</option>
          <option value="Inquiry">Inquiry</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
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
          className="p-2 border rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Download */}
        <div className="flex gap-2">
          <button
            onClick={() => handleDownload("PDF")}
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
          >
            PDF
          </button>
          <button
            onClick={() => handleDownload("CSV")}
            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
          >
            CSV
          </button>
        </div>
      </div>

      {/* Report Table */}
      <div className="overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{report.date}</td>
                  <td className="p-3 border">{report.type}</td>
                  <td className="p-3 border">{report.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-3 text-center">
                  No reports found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
