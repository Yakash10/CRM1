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
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <div className="flex space-x-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-1 rounded"
          >
            <option value="All">All</option>
            <option value="Visit">Visit</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Lead Follow-up">Lead Follow-up</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setModalOpen(true)}
          >
            Add Event
          </button>
        </div>
      </div>

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

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add New Event</h2>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Event Title"
                className="w-full border p-2 rounded"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
              <select
                className="w-full border p-2 rounded"
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
                className="w-full border p-2 rounded"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-600 text-white rounded"
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
