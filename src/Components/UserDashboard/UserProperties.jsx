import React from "react";

const PropertiesPage = () => {
  const properties = [
    {
      image:
        "https://wallup.net/wp-content/uploads/2019/09/760308-apartment-condo-interior-design-house-building-architecture-2-748x568.jpg",
      bhk: "3 BHK",
      propertyName: "VR Shobha Meadows Pvt",
      location: "Hoskote, Hoskote",
      size: 1390,
      bathrooms: 2,
      price: "83.40 lac",
      pricePerSqFt: 6000,
      availableDate: "30-04-2025",
    },
    {
      image:
        "https://wallup.net/wp-content/uploads/2019/09/760308-apartment-condo-interior-design-house-building-architecture-2-748x568.jpg",
      bhk: "3 BHK",
      propertyName: "Residential Apartment",
      location: "Bengaluru, Akshayanagar",
      size: 1250,
      bathrooms: 3,
      price: "87.50 lac",
      pricePerSqFt: 7000,
      availableDate: "30-04-2025",
    },
    {
      image:
        "https://wallup.net/wp-content/uploads/2019/09/760308-apartment-condo-interior-design-house-building-architecture-2-748x568.jpg",
      bhk: "3 BHK",
      propertyName: "Residential Apartment",
      location: "Bengaluru, Electronic City",
      size: 1258,
      bathrooms: 3,
      price: "85.00 lac",
      pricePerSqFt: 6756,
      availableDate: "30-04-2025",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
        >
          <div className="relative">
            <img
              src={property.image}
              alt="Property"
              className="w-full h-48 object-cover"
            />
            <span className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
              Sell
            </span>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-semibold mb-1">
              {property.bhk} Residential Apartment in …
            </h2>
            <p className="text-sm text-gray-600 mb-1">
              Property name: {property.propertyName}
            </p>
            <p className="text-sm text-gray-600 mb-2">📍 {property.location}</p>

            <div className="flex items-center justify-between text-sm text-gray-700 mb-2">
              <span>📐 {property.size} Sq.ft</span>
              <span>🛁 {property.bathrooms} Bathrooms</span>
              <span>📅 {property.availableDate}</span>
            </div>

            <div className="text-base  text-gray-600 mb-2">
              ₹ {property.price}{" "}
              <span className="text-sm text-gray-600">
                ( ₹ {property.pricePerSqFt} per Sq.Ft. )
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertiesPage;
