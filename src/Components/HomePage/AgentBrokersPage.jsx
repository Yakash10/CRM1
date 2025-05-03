import { Phone, Home } from "lucide-react";

const UserPage = () => {
  const brokers = [
    {
      name: "Rohit Sharma",
      agency: "Skyline Realty",
      phone: "+91-9876543210",
      assigned: 10,
      deals: 4,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Anita Mehra",
      agency: "Elite Homes",
      phone: "+91-9123456789",
      assigned: 8,
      deals: 6,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      name: "Anita Mehra",
      agency: "Elite Homes",
      phone: "+91-9123456789",
      assigned: 8,
      deals: 6,
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ];

  const clients = [
    {
      name: "Mr. Rajeev Kumar",
      owned: 3,
      email: "rajeev.kumar@example.com",
      phone: "+91-9001122334",
      status: "Paid",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
    },
    {
      name: "Ms. Priya Nair",
      owned: 2,
      email: "priya.nair@example.com",
      phone: "+91-9988776655",
      status: "Pending",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "Ms. Priya Nair",
      owned: 2,
      email: "priya.nair@example.com",
      phone: "+91-9988776655",
      status: "Pending",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Our Agents</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {brokers.map((broker, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={broker.image}
                alt={broker.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{broker.name}</h2>
                <p className="text-sm text-gray-600">{broker.agency}</p>
              </div>
            </div>
            <p className="text-sm flex items-center gap-1 text-gray-700">
              <Phone className="w-4 h-4 text-gray-500" />
              {broker.phone}
            </p>
            <p className="text-sm mt-2 text-gray-700">Assigned: {broker.assigned}</p>
            <p className="text-sm mt-2 text-gray-700">
              Deals Closed: {broker.deals}
            </p>
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4">Our Clients</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded-xl p-4 shadow hover:shadow-lg transition bg-white"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={client.image}
                alt={client.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{client.name}</h2>
                <p className="text-sm text-gray-600">{client.email}</p>
              </div>
            </div>
            <p className="text-sm flex items-center gap-1 text-gray-700">
              <Phone className="w-4 h-4 text-gray-500" />
              {client.phone}
            </p>
            <p className="text-sm flex mt-2 items-center gap-1 text-gray-700">
              <Home className="w-4 h-4 text-gray-500" />
              Properties Owned: {client.owned}
            </p>
            <p
              className={`text-sm mt-2 font-medium ${
                client.status === "Paid" ? "text-green-600" : "text-yellow-600"
              }`}
            >
              Status: {client.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
