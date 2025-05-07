import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const properties = [
  {
    id: 1,
    image:
      "https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4011-1/moda-apartments-exterior.jpg",
    type: "apartment",
    buildername: "Casagrand",
    bed: 3,
    bath: 2,
    kitchen: 1,
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
  },
  {
    id: 4,
    image:
      "https://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/4011-1/moda-apartments-exterior.jpg",
    type: "land",
    buildername: "Casagrand",
    bed: 0,
    bath: 0,
    kitchen: 0,
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
  },
  {
    id: 6,
    image:
      "https://patch.com/img/cdn20/users/24938404/20210624/040857/3-westchester-apartments-flight-facade-evening-4-copy___24160855313.jpg",
    type: "villa",
    buildername: "Casagrand",
    bed: 5,
    bath: 4,
    kitchen: 2,
  },
];

const categories = ["All", "Apartment", "Villa", "Plot", "Land"];

const PropertyListing = () => {
  const [selected, setSelected] = useState("All");

  const filteredProperties =
    selected === "All"
      ? properties
      : properties.filter(
          (p) => p.type.toLowerCase() === selected.toLowerCase()
        );

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 mt-10">
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
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-sm px-3 py-1 rounded-tr-lg">
              {property.buildername}
            </div>
            {/* Property Details Below Image */}
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
    </div>
  );
};

export default PropertyListing;
