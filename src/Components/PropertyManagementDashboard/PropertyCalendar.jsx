import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Inspection - 123 Oak St",
      date: new Date(),
      type: "Inspection",
    },
    {
      id: 2,
      title: "Maintenance - Roof Leak",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      type: "Maintenance",
    },
  ]);
  const [filterType, setFilterType] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    type: "Inspection",
  });
  const [editId, setEditId] = useState(null);

  const filteredEvents =
    filterType === "All" ? events : events.filter((e) => e.type === filterType);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddOrUpdate = () => {
    if (!formData.title) return;

    if (editId) {
      const updated = events.map((e) =>
        e.id === editId ? { ...formData, id: editId } : e
      );
      setEvents(updated);
    } else {
      setEvents([...events, { ...formData, id: Date.now() }]);
    }

    setModalOpen(false);
    setFormData({ title: "", date: new Date(), type: "Inspection" });
    setEditId(null);
  };

  const handleEdit = (event) => {
    setFormData(event);
    setEditId(event.id);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Calendar</h2>
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option value="All">All Types</option>
            <option value="Inspection">Inspection</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Meeting">Meeting</option>
            <option value="Lease Renewal">Lease Renewal</option>
          </select>
          <button
            onClick={() => {
              setModalOpen(true);
              setFormData({
                title: "",
                date: selectedDate,
                type: "Inspection",
              });
              setEditId(null);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-6">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      {/* Events List */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Events</h3>
        {filteredEvents.filter(
          (e) =>
            new Date(e.date).toDateString() ===
            new Date(selectedDate).toDateString()
        ).length === 0 ? (
          <p className="text-gray-500">No events for selected date.</p>
        ) : (
          <ul className="space-y-2">
            {filteredEvents
              .filter(
                (e) =>
                  new Date(e.date).toDateString() ===
                  new Date(selectedDate).toDateString()
              )
              .map((event) => (
                <li
                  key={event.id}
                  className="border p-3 rounded flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.type}</p>
                  </div>
                  <div className="flex gap-3 text-lg">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">
              {editId ? "Edit Event" : "Add Event"}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="border rounded w-full p-2"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="border rounded w-full p-2"
                  value={formData.date.toISOString().substring(0, 10)}
                  onChange={(e) =>
                    setFormData({ ...formData, date: new Date(e.target.value) })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Type</label>
                <select
                  className="border rounded w-full p-2"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                >
                  <option>Inspection</option>
                  <option>Maintenance</option>
                  <option>Meeting</option>
                  <option>Lease Renewal</option>
                </select>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleAddOrUpdate}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {editId ? "Update" : "Add"}
                </button>
                <button
                  onClick={() => {
                    setModalOpen(false);
                    setEditId(null);
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
