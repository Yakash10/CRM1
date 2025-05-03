import { useState } from "react";
import { FaMapMarkerAlt, FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApartmentsData from "../HomePage/ApartmentsData.json"; // Import your JSON data

export default function PropertyCards() {
  const [selectedType, setSelectedType] = useState("All");
  const navigate = useNavigate();

  // Filter properties based on selected type
  const filteredProperties =
    selectedType === "All"
      ? ApartmentsData
      : ApartmentsData.filter((property) => property.type === selectedType);

  return (
    <div className="p-4 md:p-6 flex flex-col items-center">
      {/* Filter Buttons with Hover and Click Animations */}
      <motion.div
        className="w-full max-w-5xl text-center mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ amount: 0.5 }}
      >
        <p className="text-lg font-semibold mb-4">
          Explore the properties that suit your lifestyle
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

      {/* Property Listings - Animates Every Time */}
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
            className="rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ amount: 0.5 }}
          >
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-full h-48 sm:h-56 object-cover"
            />
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
