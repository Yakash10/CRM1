import React from "react";
import { Mail, Phone } from "lucide-react";

const clients = [
  {
    id: 1,
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "(555) 456-7890",
    image: "https://i.pravatar.cc/100?u=1",
  },
  {
    id: 2,
    name: "Sarah Agent",
    email: "sarah.agent@example.com",
    phone: "(555) 123-4567",
    image: "https://i.pravatar.cc/100?u=2",
  },
  {
    id: 2,
    name: "Sarah Agent",
    email: "sarah.agent@example.com",
    phone: "(555) 123-4567",
    image: "https://i.pravatar.cc/100?u=2",
  },
  {
    id: 2,
    name: "Sarah Agent",
    email: "sarah.agent@example.com",
    phone: "(555) 123-4567",
    image: "https://i.pravatar.cc/100?u=2",
  },
  {
    id: 2,
    name: "Sarah Agent",
    email: "sarah.agent@example.com",
    phone: "(555) 123-4567",
    image: "https://i.pravatar.cc/100?u=2",
  },
  {
    id: 2,
    name: "Sarah Agent",
    email: "sarah.agent@example.com",
    phone: "(555) 123-4567",
    image: "https://i.pravatar.cc/100?u=2",
  },

  // Add more clients as needed
];

const UserClients = () => {
  return (
    <>
      <p className="p-3 text-lg font-semibold">Clients</p>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clients.map((client) => (
          <div
            key={client.id}
            className="flex items-center space-x-4 bg-gray-100 p-3 rounded-lg shadow-sm"
          >
            <img
              src={client.image}
              alt={client.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1 space-y-2">
              <p className="font-semibold">{client.name}</p>
              <div className="flex items-center text-sm text-gray-600 space-x-2">
                <Mail size={16} className="text-blue-500" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 space-x-2">
                <Phone size={16} className="text-blue-500" />
                <span>{client.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserClients;
