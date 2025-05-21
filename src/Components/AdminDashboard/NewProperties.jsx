import { useState } from "react";
import properties1 from "../AdminDashboard/Assets/properties1.png";
import properties2 from "../AdminDashboard/Assets/properties2.png";
import properties3 from "../AdminDashboard/Assets/properties3.png";


const NewProperties = () => {
  const [properties] = useState([
    {
      id: 1,
      name: "Asure property 1",
      price: "₹2,00,000",
      image: properties1, // Replace with actual image
    },
    {
      id: 2,
      name: "Asure property 1",
      price: "₹2,00,000",
      image: properties2,
    },
    {
      id: 3,
      name: "Asure property 1",
      price: "₹2,00,000",
      image: properties3,
    },
  ]);

  return (
    <div className="p-4 bg-white shadow rounded-lg max-w-md w-full mr-3">
      <h2 className="text-xl font-semibold mb-4">New properties</h2>
      <div className="space-y-4">
        {properties.map((property) => (
          <div
            key={property.id}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
          >
            <img
              src={property.image}
              alt={property.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1 px-4">
              <p className="text-sm font-medium">{property.name}</p>
              <p className="">{property.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProperties;
