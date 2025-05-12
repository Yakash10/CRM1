import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { formatISO } from "date-fns";

const CalendarPage = () => {
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "Visit - Green Villa",
      date: formatISO(new Date(), { representation: "date" }),
      type: "Visit",
    },
    {
      id: "2",
      title: "Maintenance - Ocean Apartment",
      date: formatISO(new Date(new Date().setDate(new Date().getDate() + 1)), {
        representation: "date",
      }),
      type: "Maintenance",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    type: "Visit",
  });

  const [selectedType, setSelectedType] = useState("All");

  const handleDateClick = (arg) => {
    setNewEvent({ ...newEvent, date: arg.dateStr });
    setModalOpen(true);
  };

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert("Please enter title and date.");
      return;
    }

    const id = Date.now().toString();
    const newItem = { ...newEvent, id };
    setEvents([...events, newItem]);
    setModalOpen(false);
    setNewEvent({ title: "", date: "", type: "Visit" });
  };

  const deleteEvent = (eventId) => {
    if (window.confirm("Delete this event?")) {
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const filteredEvents =
    selectedType === "All"
      ? events
      : events.filter((e) => e.type === selectedType);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <h2 className="text-2xl font-bold text-gray-800"> Calendar</h2>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Visit">Visit</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Lead Follow-up">Lead Follow-up</option>
          </select>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition"
            onClick={() => setModalOpen(true)}
          >
            + Add Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          dateClick={handleDateClick}
          events={filteredEvents.map((e) => ({
            ...e,
            color:
              e.type === "Visit"
                ? "#34d399"
                : e.type === "Maintenance"
                ? "#60a5fa"
                : "#fbbf24",
          }))}
          eventClick={(info) => deleteEvent(info.event.id)}
          height="auto"
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 transition-opacity">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-lg animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Add New Event
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <select
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newEvent.type}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, type: e.target.value })
                }
              >
                <option>Visit</option>
                <option>Maintenance</option>
                <option>Lead Follow-up</option>
              </select>
              <input
                type="date"
                className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                onClick={addEvent}
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

export default CalendarPage;
