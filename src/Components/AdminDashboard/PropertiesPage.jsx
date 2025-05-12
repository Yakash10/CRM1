import React, { useState } from "react";
import {
  HomeModernIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function PropertyManager() {
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(1); // Track which form is currently visible
  const [editingIndex, setEditingIndex] = useState(null);
  const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterBuilder, setFilterBuilder] = useState("All");
  const [filterPropertyType, setFilterPropertyType] = useState("All");
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const availableAmenities = [
    "Air conditioner",
    "Fire extinguisher",
    "Sports field",
    "Smoking area",
    "Kids zone",
    "Pet friendly",
    "Elevator",
    "Laundry",
  ];

  const [properties, setProperties] = useState([
    {
      title: "Modern Downtown Apartment",
      address: "123 Main St, Anytown, USA",
      price: "$425,000",
      buildername: "Casagrand",
      location: "Chennai",
      bed: 2,
      bath: 2,
      sqft: 1250,
      type: "For Sale",
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      video: "https://www.youtube.com/watch?v=9XaS93WMRQQ",
      minPrice: "$400,000",
      maxPrice: "$450,000",
      description:
        "A modern apartment in the heart of downtown with great amenities. This property offers a vibrant urban lifestyle with easy access to shops, restaurants, and public transport. The building features a gym, pool, and concierge service. The apartment itself is spacious and filled with natural light.",
      propertyType: "Apartment",
      units: "2BHK",
      kitchen: "1",
      mapView: "https://maps.google.com/?q=123+Main+St",
      carpetArea: "1200 sqft",
      sizes: "2300-2400",
      phase: "Phase 1",
      floor: "5th Floor",
      keyAmenities: ["Air conditioner", "Elevator", "Laundry"],
      principalInterest: 2000,
      propertyTaxes: 2000,
      homeownersInsurance: 1000,
      downPayment: "$85,000",
      loanDetails: "30-yr 6.65%",
      homePrice: "$425,000",
    },
    {
      title: "Luxury Waterfront Villa",
      address: "456 Ocean Dr, Beachville, USA",
      price: "$1,250,000",
      buildername: "Radiance",
      location: "Salem",
      bed: 4,
      bath: 3,
      sqft: 3200,
      type: "For Sale",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      video: "https://www.youtube.com/watch?v=LXb3EKWsInQ",
      minPrice: "$1,200,000",
      maxPrice: "$1,300,000",
      description:
        "Luxury villa with private beach access and panoramic ocean views. Enjoy breathtaking sunsets from your private terrace. This property is perfect for those seeking tranquility and luxury by the sea. Features include a large garden, private pool, and state-of-the-art security system.",
      propertyType: "Villa",
      units: "4BHK",
      kitchen: "2",
      mapView: "https://maps.google.com/?q=456+Ocean+Dr",
      carpetArea: "3000 sqft",
      sizes: "3200",
      phase: "Phase 2",
      floor: "Ground + 1",
      keyAmenities: ["Pet friendly", "Sports field", "Fire extinguisher"],
      principalInterest: 5000,
      propertyTaxes: 4000,
      homeownersInsurance: 2500,
      downPayment: "$250,000",
      loanDetails: "15-yr 5.5%",
      homePrice: "$1,250,000",
    },
    {
      title: "Cozy Suburban House",
      address: "789 Park Ave, Suburbia, USA",
      price: "$675,000",
      buildername: "Relator",
      location: "Chennai",
      bed: 3,
      bath: 2,
      sqft: 1800,
      type: "For Sale",
      status: "Active",
      image:
        "https://cdnassets.hw.net/04/2c/967deff449bd8a24c5fbb96dccd2/6474f8a03a894163ac235432988b491f.png",
      video: "https://www.youtube.com/watch?v=7D4WxT0V5WM",
      minPrice: "$650,000",
      maxPrice: "$700,000",
      description:
        "Charming family home in a quiet suburban neighborhood. Close to schools, parks, and shopping centers. This house offers a large backyard, perfect for children and pets. The interior is newly renovated with modern finishes.",
      propertyType: "House",
      units: "3BHK",
      kitchen: "1",
      mapView: "https://maps.google.com/?q=789+Park+Ave",
      carpetArea: "1700 sqft",
      sizes: "1800-1900",
      phase: "Phase 1",
      floor: "Ground",
      keyAmenities: ["Kids zone", "Smoking area"],
      principalInterest: 3000,
      propertyTaxes: 3000,
      homeownersInsurance: 1500,
      downPayment: "$135,000",
      loanDetails: "30-yr 6.8%",
      homePrice: "$675,000",
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    address: "",
    price: "",
    buildername: "Casagrand",
    location: "Chennai",
    bed: "",
    bath: "",
    sqft: "",
    type: "For Sale",
    status: "Active",
    image: null,
    video: "",
    minPrice: "",
    maxPrice: "",
    description: "",
    propertyType: "Apartment",
    units: "",
    kitchen: "",
    mapView: "",
    carpetArea: "",
    sizes: "",
    phase: "",
    floor: "",
    keyAmenities: [],
    principalInterest: "",
    propertyTaxes: "",
    homeownersInsurance: "",
    downPayment: "",
    loanDetails: "",
    homePrice: "",
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0] ? URL.createObjectURL(files[0]) : null,
      });
    } else if (name === "video") {
      setFormData({
        ...formData,
        video: value,
      });
    } else if (type === "checkbox" && name === "amenity") {
      const amenity = value;
      if (checked) {
        setFormData({
          ...formData,
          keyAmenities: [...formData.keyAmenities, amenity],
        });
      } else {
        setFormData({
          ...formData,
          keyAmenities: formData.keyAmenities.filter(
            (item) => item !== amenity
          ),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProperty = { ...formData };

    if (editingIndex !== null) {
      const updated = [...properties];
      updated[editingIndex] = newProperty;
      setProperties(updated);
    } else {
      setProperties([...properties, newProperty]);
    }

    setShowModal(false);
    setEditingIndex(null);
    setCurrentForm(1);
    setFormData({
      title: "",
      address: "",
      price: "",
      buildername: "Casagrand",
      location: "Chennai",
      bed: "",
      bath: "",
      sqft: "",
      type: "For Sale",
      status: "Active",
      image: null,
      video: "",
      minPrice: "",
      maxPrice: "",
      description: "",
      propertyType: "Apartment",
      units: "",
      kitchen: "",
      mapView: "",
      carpetArea: "",
      sizes: "",
      phase: "",
      floor: "",
      keyAmenities: [],
      principalInterest: "",
      propertyTaxes: "",
      homeownersInsurance: "",
      downPayment: "",
      loanDetails: "",
      homePrice: "",
    });
  };

  const handleEdit = (index) => {
    const prop = properties[index];
    setFormData({ ...prop });
    setEditingIndex(index);
    setShowModal(true);
    setCurrentForm(1);
    setDropdownOpenIndex(null);
  };

  const handleDelete = (index) => {
    const updated = [...properties];
    updated.splice(index, 1);
    setProperties(updated);
    setDropdownOpenIndex(null);
  };

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const nextForm = () => {
    setCurrentForm(currentForm + 1);
  };

  const prevForm = () => {
    setCurrentForm(currentForm - 1);
  };

  const filteredProperties = properties.filter((prop) => {
    const typeMatch = filterType === "All" || prop.type === filterType;
    const statusMatch = filterStatus === "All" || prop.status === filterStatus;
    const builderMatch =
      filterBuilder === "All" || prop.buildername === filterBuilder;
    const propertyTypeMatch =
      filterPropertyType === "All" || prop.propertyType === filterPropertyType;
    return typeMatch && statusMatch && builderMatch && propertyTypeMatch;
  });

  // Form 1: Basic Property Information
  const renderForm1 = () => (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {editingIndex !== null ? "Edit Property" : "Add Property"} - Basic
        Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter property title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter property address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price
          </label>
          <input
            type="text"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            type="text"
            name="minPrice"
            placeholder="Enter min price"
            value={formData.minPrice}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            type="text"
            name="maxPrice"
            placeholder="Enter max price"
            value={formData.maxPrice}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Type
          </label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Builder Name
          </label>
          <select
            name="buildername"
            value={formData.buildername}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Casagrand">Casagrand</option>
            <option value="Radiance">Radiance</option>
            <option value="Relator">Relator</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="Chennai">Chennai</option>
            <option value="Salem">Salem</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Listing Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full text-sm"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt="Preview"
              className="mt-2 h-20 object-cover rounded"
            />
          )}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="bg-gray-300 px-4 py-2 rounded text-sm"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={nextForm}
          className="bg-purple-600 text-white px-4 py-2 rounded text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Form 2: Property Details
  const renderForm2 = () => (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {editingIndex !== null ? "Edit Property" : "Add Property"} - Details
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bedrooms
          </label>
          <input
            type="number"
            name="bed"
            placeholder="Enter number of bedrooms"
            value={formData.bed}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bathrooms
          </label>
          <input
            type="number"
            name="bath"
            placeholder="Enter number of bathrooms"
            value={formData.bath}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Square Feet
          </label>
          <input
            type="number"
            name="sqft"
            placeholder="Enter square footage"
            value={formData.sqft}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Units
          </label>
          <input
            type="text"
            name="units"
            placeholder="Enter units (e.g., 2BHK)"
            value={formData.units}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kitchen
          </label>
          <input
            type="text"
            name="kitchen"
            placeholder="Enter kitchen count"
            value={formData.kitchen}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carpet Area
          </label>
          <input
            type="text"
            name="carpetArea"
            placeholder="Enter carpet area (e.g., 1200 sqft)"
            value={formData.carpetArea}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sizes
          </label>
          <input
            type="text"
            name="sizes"
            placeholder="Enter sizes (e.g., 2300-2400)"
            value={formData.sizes}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phase
          </label>
          <input
            type="text"
            name="phase"
            placeholder="Enter phase (e.g., Phase 1)"
            value={formData.phase}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Floor
          </label>
          <input
            type="text"
            name="floor"
            placeholder="Enter floor (e.g., 5th Floor)"
            value={formData.floor}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Map View Link
          </label>
          <input
            type="text"
            name="mapView"
            placeholder="Enter map view URL"
            value={formData.mapView}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Video URL
          </label>
          <input
            type="text"
            name="video"
            placeholder="Enter video URL"
            value={formData.video}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full text-sm"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevForm}
          className="bg-gray-300 px-4 py-2 rounded text-sm"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextForm}
          className="bg-purple-600 text-white px-4 py-2 rounded text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Form 3: Financial Information
  const renderForm3 = () => (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {editingIndex !== null ? "Edit Property" : "Add Property"} - Financial
        Details
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Principal & Interest
          </label>
          <input
            type="number"
            name="principalInterest"
            placeholder="Enter principal & interest"
            value={formData.principalInterest}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Taxes
          </label>
          <input
            type="number"
            name="propertyTaxes"
            placeholder="Enter property taxes"
            value={formData.propertyTaxes}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Homeowners Insurance
          </label>
          <input
            type="number"
            name="homeownersInsurance"
            placeholder="Enter homeowners insurance"
            value={formData.homeownersInsurance}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Down Payment
          </label>
          <input
            type="text"
            name="downPayment"
            placeholder="Enter down payment"
            value={formData.downPayment}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Loan Details
          </label>
          <input
            type="text"
            name="loanDetails"
            placeholder="Enter loan details (e.g., 30-yr 6.65%)"
            value={formData.loanDetails}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Home Price
          </label>
          <input
            type="text"
            name="homePrice"
            placeholder="Enter home price"
            value={formData.homePrice}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
          />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevForm}
          className="bg-gray-300 px-4 py-2 rounded text-sm"
        >
          Back
        </button>
        <button
          type="button"
          onClick={nextForm}
          className="bg-purple-600 text-white px-4 py-2 rounded text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );

  // Form 4: Additional Information
  const renderForm4 = () => (
    <div>
      <h2 className="text-lg font-bold mb-4">
        {editingIndex !== null ? "Edit Property" : "Add Property"} - Additional
        Information
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter property description"
            value={formData.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full"
            rows="3"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Key Amenities
          </label>
          <div className="grid grid-cols-2 gap-2">
            {availableAmenities.map((amenity) => (
              <div key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  id={amenity}
                  name="amenity"
                  value={amenity}
                  checked={formData.keyAmenities.includes(amenity)}
                  onChange={handleChange}
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor={amenity}
                  className="ml-2 block text-sm text-gray-900"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prevForm}
          className="bg-gray-300 px-4 py-2 rounded text-sm"
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded text-sm"
        >
          {editingIndex !== null ? "Update Property" : "Add Property"}
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6">
      <p className="p-3 font-semibold text-lg">Properties</p>
      {/* Filters and Button */}
      <div className="flex flex-col lg:flex-row gap-3 justify-between items-start lg:items-center mb-6 flex-wrap">
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Types</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Sold">Sold</option>
          </select>

          <select
            value={filterBuilder}
            onChange={(e) => setFilterBuilder(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Builders</option>
            <option value="Casagrand">Casagrand</option>
            <option value="Radiance">Radiance</option>
            <option value="Relator">Relator</option>
          </select>

          <select
            value={filterPropertyType}
            onChange={(e) => setFilterPropertyType(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            <option value="All">All Property Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
          </select>
        </div>

        <button
          onClick={() => {
            setShowModal(true);
            setEditingIndex(null);
            setCurrentForm(1);
            setFormData({
              title: "",
              address: "",
              price: "",
              buildername: "Casagrand",
              location: "Chennai",
              bed: "",
              bath: "",
              sqft: "",
              type: "For Sale",
              status: "Active",
              image: null,
              video: "",
              minPrice: "",
              maxPrice: "",
              description: "",
              propertyType: "Apartment",
              units: "",
              kitchen: "",
              mapView: "",
              carpetArea: "",
              sizes: "",
              phase: "",
              floor: "",
              keyAmenities: [],
              principalInterest: "",
              propertyTaxes: "",
              homeownersInsurance: "",
              downPayment: "",
              loanDetails: "",
              homePrice: "",
            });
          }}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          + Add Property
        </button>
      </div>
      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            {/* Progress indicator */}
            <div className="flex justify-between mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex flex-col items-center ${
                    currentForm >= step ? "text-purple-600" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      currentForm === step
                        ? "bg-purple-600 text-white"
                        : currentForm > step
                        ? "bg-purple-100"
                        : "bg-gray-100"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="text-xs mt-1">
                    {step === 1 && "Basic"}
                    {step === 2 && "Details"}
                    {step === 3 && "Financial"}
                    {step === 4 && "More"}
                  </span>
                </div>
              ))}
            </div>

            {currentForm === 1 && renderForm1()}
            {currentForm === 2 && renderForm2()}
            {currentForm === 3 && renderForm3()}
            {currentForm === 4 && renderForm4()}
          </form>
        </div>
      )}
      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProperties.map((prop, index) => (
          <div key={index} className="bg-white rounded-lg shadow relative">
            <div className="relative">
              {prop.image && (
                <img
                  src={prop.image}
                  alt={prop.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <span className="absolute top-2 left-2 bg-white bg-opacity-80 text-gray-800 text-xs px-2 py-1 rounded shadow">
                {prop.buildername}
              </span>
              <span
                className={`absolute top-2 right-2 px-2 py-1 text-xs text-white rounded ${
                  prop.type === "For Sale" ? "bg-purple-600" : "bg-blue-500"
                }`}
              >
                {prop.type}
              </span>
              <span className="absolute bottom-2 left-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded shadow font-bold">
                {prop.propertyType}
              </span>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className=" mt-1 text-lg font-semibold">{prop.title}</p>

                  <p className=" mt-1">{prop.location}</p>
                  <p className="text-lg font-semibold">{prop.price}</p>
                </div>
                <button
                  onClick={() =>
                    setDropdownOpenIndex(
                      dropdownOpenIndex === index ? null : index
                    )
                  }
                  className="text-gray-500 hover:text-gray-700"
                >
                  ⋮
                </button>
                {dropdownOpenIndex === index && (
                  <div className="absolute right-4 top-10 w-40 bg-white border rounded shadow z-10">
                    <button
                      onClick={() => handleEdit(index)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      ✏ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      🗑 Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
         
    </div>
  );
}
