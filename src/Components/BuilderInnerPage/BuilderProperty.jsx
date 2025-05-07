import { useState } from "react";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export default function PropertyCards() {
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const selectedBuilder = location.state?.builderName;

  // Sample static property data with buildername added
  const properties = [
    {
      id: 1,
      name: "Ocean View Apartment",
      type: "Apartments",
      price: "₹80 Lakhs",
      location: "Chennai, Tamil Nadu",
      bed: 3,
      bath: 2,
      sqft: 1400,
      buildername: "Casagrand",
      images: [
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      ],
    },
    {
      id: 2,
      name: "Green Villa Estate",
      type: "Villas",
      price: "₹1.2 Crore",
      location: "Hyderabad, Telangana",
      bed: 4,
      bath: 3,
      sqft: 2500,
      buildername: "Redient",
      images: [
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      ],
    },
    {
      id: 3,
      name: "City Plots Phase 2",
      type: "Plots",
      price: "₹45 Lakhs",
      location: "Bangalore, Karnataka",
      bed: 0,
      bath: 0,
      sqft: 1200,
      buildername: "Relator",
      images: [
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      ],
    },
  ];

  // Filter by both type and builder if builder is selected
  const filteredProperties = properties.filter((property) => {
    const typeMatch = selectedType === "All" || property.type === selectedType;
    const builderMatch =
      !selectedBuilder || property.buildername === selectedBuilder;
    return typeMatch && builderMatch;
  });

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      <motion.div
        className="w-full max-w-5xl text-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.5 }}
      >
        <p className="text-lg font-semibold mb-4">
          {selectedBuilder
            ? `${selectedBuilder} Properties`
            : "Explore the properties that suit your lifestyle"}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {["All", "Apartments", "Villas", "Plots", "Land"].map((type) => (
            <motion.button
              key={type}
              onClick={() => setSelectedType(type)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full border text-sm md:text-base transition-all duration-300 ${
                selectedType === type
                  ? "border-orange-500 text-orange-500 bg-orange-100 shadow-md"
                  : "border-gray-500 text-gray-500 bg-transparent"
              }`}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </motion.div>
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.5 }}
      >
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            className="rounded-2xl overflow-hidden relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ amount: 0.5 }}
          >
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.name}
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-medium px-3 py-1 rounded">
                {property.buildername}
              </div>
            </div>
            <div className="p-4 md:p-5">
              <span className="bg-orange-400 text-white text-xs font-semibold px-2 py-1 rounded">
                New Launch
              </span>
              <h2 className="text-lg font-semibold mt-2 text-left">
                {property.name}
              </h2>
              <p className="text-orange-600 font-bold text-sm text-left">
                {property.price}
              </p>
              <p className="text-gray-600 flex items-center text-sm mt-2 text-left">
                <FaMapMarkerAlt className="mr-2" /> {property.location}
              </p>
              <p className="text-gray-600 flex items-center text-sm mt-2 text-left">
                <FaBed className="mr-2" /> {property.bed} Beds, {property.bath}{" "}
                Baths, {property.sqft} sqft
              </p>
              <div className="flex mt-4">
                <button
                  onClick={() => navigate("/property")}
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm md:text-base"
                >
                  View More
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
