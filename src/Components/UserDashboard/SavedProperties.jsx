import React, { useState } from "react";
import { Heart, HeartIcon } from "lucide-react"; // If using lucide-react for icons

const initialSaved = [
  {
    id: 1,
    name: "Skyline Apartment",
    location: "New York",
    type: "Apartment",
    price: 850000,
    liked: true,
    image:
      "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png", // Add an image URL
  },
  {
    id: 2,
    name: "Lakeview House",
    location: "Chicago",
    type: "House",
    price: 650000,
    liked: false,
    image:
      "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png", // Add an image URL
  },
  {
    id: 3,
    name: "Palm Villa",
    location: "Los Angeles",
    type: "Villa",
    price: 1200000,
    liked: true,
    image:
      "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png", // Add an image URL
  },
];

const SavedProperties = () => {
  const [savedList, setSavedList] = useState(initialSaved);
  const [sortBy, setSortBy] = useState("");

  const handleRemove = (id) => {
    const updated = savedList.filter((p) => p.id !== id);
    setSavedList(updated);
  };

  const toggleLike = (id) => {
    const updated = savedList.map((p) =>
      p.id === id ? { ...p, liked: !p.liked } : p
    );
    setSavedList(updated);
  };

  const sortedList = [...savedList].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "location") return a.location.localeCompare(b.location);
    return 0;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Saved Properties</h1>

      {/* Sort Dropdown */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Property Cards */}
      {sortedList.length === 0 ? (
        <p>No saved properties.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedList.map((property) => (
            <div key={property.id} className="p-4 rounded border relative">
              {/* Property Image */}
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover rounded mb-4"
              />

              {/* Like Button */}
              <button
                onClick={() => toggleLike(property.id)}
                className="absolute top-5 right-8 text-red-500"
              >
                {property.liked ? <Heart fill="currentColor" /> : <HeartIcon />}
              </button>

              <h2 className="text-lg font-bold mb-2">{property.name}</h2>
              <p>
                <span className="font-semibold">Location:</span>{" "}
                {property.location}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {property.type}
              </p>
              <p>
                <span className="font-semibold">Price:</span> $$
                {property.price.toLocaleString()}
              </p>
              <div className="flex justify-between mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  View
                </button>
                <button
                  onClick={() => handleRemove(property.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedProperties;
