import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "./Popup";

const properties = [
  {
    id: 1,
    image:
      "https://thumbs.dreamstime.com/b/apartment-building-architectural-details-modern-39732665.jpg",
    type: "apartment",
    buildername: "Casagrand",
    bed: 3,
    bath: 2,
    kitchen: 1,
    location: "Chennai",
  },
  {
    id: 2,
    image:
      "https://patch.com/img/cdn20/users/24938404/20210624/040857/3-westchester-apartments-flight-facade-evening-4-copy___24160855313.jpg",
    type: "villa",
    buildername: "Redient",
    bed: 4,
    bath: 3,
    kitchen: 2,
    location: "Hyderabad",
  },
  {
    id: 3,
    image:
      "https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4011-1/moda-apartments-exterior.jpg",
    type: "plot",
    buildername: "Relator",
    bed: 0,
    bath: 0,
    kitchen: 0,
    location: "Delhi-NCR",
  },
  {
    id: 4,
    image:
      "https://thumbs.dreamstime.com/b/apartment-building-architectural-details-modern-39732665.jpg",
    type: "land",
    buildername: "Casagrand",
    bed: 0,
    bath: 0,
    kitchen: 0,
    location: "Mumbai",
  },
  {
    id: 5,
    image:
      "https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4011-1/moda-apartments-exterior.jpg",
    type: "apartment",
    buildername: "Redient",
    bed: 3,
    bath: 2,
    kitchen: 1,
    location: "Bengaluru",
  },
  {
    id: 6,
    image:
      "https://thumbs.dreamstime.com/b/apartment-building-architectural-details-modern-39732665.jpg",
    type: "villa",
    buildername: "Casagrand",
    bed: 5,
    bath: 4,
    kitchen: 2,
    location: "Chennai",
  },
];

const categories = ["All", "Apartment", "Villa", "Plot", "Land"];

const Apartments = () => {
  const [selected, setSelected] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  // Filter properties by both category and location
  const filteredProperties = properties.filter((property) => {
    const matchesCategory =
      selected === "All" ||
      property.type.toLowerCase() === selected.toLowerCase();
    const matchesLocation =
      !selectedLocation || property.location === selectedLocation;
    return matchesCategory && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
      {/* Location Popup */}
      <Popup
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Location Filter Display */}
      {selectedLocation && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm">Filtering by location: </span>
          <span className="font-semibold">{selectedLocation}</span>
          <button
            onClick={() => setSelectedLocation(null)}
            className="ml-2 text-sm text-red-500 hover:text-red-700"
          >
            Clear
          </button>
        </div>
      )}

      {/* Heading and View All */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-semibold leading-snug">
            Explore Properties That Suit
            <br />
            Your Lifestyle
          </h2>
        </div>
        <button className="text-white bg-orange-600 hover:bg-orange-700 px-4 py-2 text-sm rounded">
          View all
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-1 rounded-full border ${
              selected === cat
                ? "bg-orange-600 text-white border-orange-600"
                : "text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              className="relative w-full h-[300px] rounded-lg overflow-hidden shadow-md group"
            >
              <img
                onClick={() =>
                  navigate("/builder", {
                    state: { builderName: property.buildername },
                  })
                }
                src={property.image}
                alt={`Property ${property.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
              />

              {/* Location (Left Side) */}
              <div className="absolute top-2 left-2 bg-white bg-opacity-80 text-black text-xs font-medium px-3 py-1 rounded-r-lg shadow">
                {property.location}
              </div>

              {/* Builder Name (Right Side) */}
              <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-l-lg shadow">
                {property.buildername}
              </div>

              {/* Property Details at Bottom */}
              <div className="absolute flex gap-2 bottom-0 left-0 w-full bg-black bg-opacity-10 text-white text-xs px-4 py-2">
                <p className="border border-white rounded-full px-2 py-1">
                  {property.bed} Bed
                </p>
                <p className="border border-white rounded-full px-2 py-1">
                  {property.bath} Bath
                </p>
                <p className="border border-white rounded-full px-2 py-1">
                  {property.kitchen} Kitchen
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500">
            No properties found matching your filters.
          </p>
          <button
            onClick={() => {
              setSelected("All");
              setSelectedLocation(null);
            }}
            className="mt-4 text-orange-600 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Apartments;
