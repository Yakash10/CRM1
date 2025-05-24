import React, { useState } from "react";
import {
  HomeModernIcon,
  BuildingOfficeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export default function PropertyManager() {
  const [showModal, setShowModal] = useState(false);
  const [currentForm, setCurrentForm] = useState(1);
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

  const [profile, setProfile] = useState({
    companyName: "",
    tagline: "",
    logo: "",
    coverPhotos: [],
    gallery: [],
    website: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    description: "",
    features: [],
    servicesOffered: [],
    socialLinks: {
      facebook: "",
      linkedin: "",
      instagram: "",
      youtube: "",
    },
    supportInfo: {
      contactPerson: "",
      supportEmail: "",
      supportPhone: "",
    },
  });

  const [newFeature, setNewFeature] = useState("");
  const [newService, setNewService] = useState("");
  const [newCoverPhoto, setNewCoverPhoto] = useState({
    url: "",
    type: "image",
    title: "",
  });
  const [newGalleryItem, setNewGalleryItem] = useState({
    url: "",
    type: "image",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setProfile((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index) => {
    setProfile((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addService = () => {
    if (newService.trim()) {
      setProfile((prev) => ({
        ...prev,
        servicesOffered: [...prev.servicesOffered, newService.trim()],
      }));
      setNewService("");
    }
  };

  const removeService = (index) => {
    setProfile((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.filter((_, i) => i !== index),
    }));
  };

  const addCoverPhoto = () => {
    if (newCoverPhoto.url.trim()) {
      setProfile((prev) => ({
        ...prev,
        coverPhotos: [...prev.coverPhotos, { ...newCoverPhoto }],
      }));
      setNewCoverPhoto({ url: "", type: "image", title: "" });
    }
  };

  const removeCoverPhoto = (index) => {
    setProfile((prev) => ({
      ...prev,
      coverPhotos: prev.coverPhotos.filter((_, i) => i !== index),
    }));
  };

  const addGalleryItem = () => {
    if (newGalleryItem.url.trim()) {
      setProfile((prev) => ({
        ...prev,
        gallery: [...prev.gallery, { ...newGalleryItem }],
      }));
      setNewGalleryItem({ url: "", type: "image", title: "" });
    }
  };

  const removeGalleryItem = (index) => {
    setProfile((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // Filter properties by filterType, filterStatus, filterBuilder, filterPropertyType
  const filteredProperties = properties.filter((property) => {
    const matchesType =
      filterType === "All" || property.type.toLowerCase() === filterType.toLowerCase();
    const matchesStatus =
      filterStatus === "All" || property.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesBuilder =
      filterBuilder === "All" || property.buildername.toLowerCase() === filterBuilder.toLowerCase();
    const matchesPropertyType =
      filterPropertyType === "All" ||
      property.propertyType.toLowerCase() === filterPropertyType.toLowerCase();

    return matchesType && matchesStatus && matchesBuilder && matchesPropertyType;
  });

  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-100 p-4">
      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-3 items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center flex-grow">
          {/* Filters */}
          <select
            className="border rounded p-2"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            aria-label="Filter by Type"
          >
            <option value="" disabled hidden>
              select type
            </option>
            <option value="All">All</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
          </select>

          <select
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            aria-label="Filter by Status"
          >
            <option value="" disabled hidden>
              select status
            </option>
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            className="border rounded p-2"
            value={filterBuilder}
            onChange={(e) => setFilterBuilder(e.target.value)}
            aria-label="Filter by Builders"
          >
            <option value="" disabled hidden>
              select builders
            </option>
            <option value="All">All</option>
            <option value="Casagrand">Casagrand</option>
            <option value="Radiance">Radiance</option>
            <option value="Relator">Relator</option>
          </select>

          <select
            className="border rounded p-2"
            value={filterPropertyType}
            onChange={(e) => setFilterPropertyType(e.target.value)}
            aria-label="Filter by Property Type"
          >
            <option value="" disabled hidden>
              select property
            </option>
            <option value="All">All</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="House">House</option>
          </select>
        </div>

        <button
          type="button"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ml-auto"
          onClick={() => setShowModal(true)} // open modal
        >
          Add Builder
        </button>
      </div>

      {/* Properties list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center col-span-full text-gray-700">
            No properties match filters.
          </p>
        ) : (
          filteredProperties.map((property, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
              tabIndex={0}
              aria-label={`Property: ${property.title}`}
            >
              <img
                src={property.image}
                alt={property.title}
                className="rounded-md mb-3 object-cover h-48 w-full"
              />
              <h3 className="font-bold text-lg mb-1">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-1">{property.address}</p>
              <p className="text-green-600 font-semibold mb-1">
                {property.price}
              </p>
              <p className="text-gray-700 mb-1">
                Builder: {property.buildername} | Location: {property.location}
              </p>
              <p className="text-gray-700 mb-2">
                Beds: {property.bed} | Baths: {property.bath} | SqFt:{" "}
                {property.sqft}
              </p>
              <button
                onClick={() => toggleDescription(index)}
                className="text-blue-600 underline self-start mb-2 focus:outline-none"
                aria-expanded={!!expandedDescriptions[index]}
                aria-controls={`description-${index}`}
              >
                {expandedDescriptions[index] ? "Show Less" : "Show More"}
              </button>
              {expandedDescriptions[index] && (
                <p
                  id={`description-${index}`}
                  className="text-gray-600 mb-2"
                  aria-live="polite"
                >
                  {property.description}
                </p>
              )}
              {/* Dropdown with details */}
              <div className="relative">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none"
                  onClick={() =>
                    setDropdownOpenIndex(
                      dropdownOpenIndex === index ? null : index
                    )
                  }
                  aria-haspopup="true"
                  aria-expanded={dropdownOpenIndex === index}
                >
                  More Details
                </button>
                {dropdownOpenIndex === index && (
                  <div
                    className="absolute z-10 bg-white border rounded shadow-md mt-2 p-3 w-72"
                    role="menu"
                    aria-label="Property Details"
                  >
                    <p>
                      <strong>Units:</strong> {property.units}
                    </p>
                    <p>
                      <strong>Kitchen:</strong> {property.kitchen}
                    </p>
                    <p>
                      <strong>Carpet Area:</strong> {property.carpetArea}
                    </p>
                    <p>
                      <strong>Map View:</strong>{" "}
                      <a
                        href={property.mapView}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Link
                      </a>
                    </p>
                    <p>
                      <strong>Phase:</strong> {property.phase}
                    </p>
                    <p>
                      <strong>Floor:</strong> {property.floor}
                    </p>
                    <p>
                      <strong>Key Amenities:</strong>{" "}
                      {property.keyAmenities.join(", ")}
                    </p>
                    <p>
                      <strong>Loan Details:</strong> {property.loanDetails}
                    </p>
                    <p>
                      <strong>Down Payment:</strong> {property.downPayment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setShowModal(false)} // close modal on background click
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent closing modal when clicking inside
          >
            <h2 id="modal-title" className="text-xl font-semibold mb-4">
              Add Builder
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add form submit logic here
                alert("Builder added!");
                setShowModal(false);
              }}
            >
              {/* Section 1: Basic Information */}
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Basic Information
              </h2>

              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={profile.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    value={profile.tagline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="A short tagline about your company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company 
                  </label>
                  <input
                    type="file"
                    name="logo"
                    // file inputs cannot have a controlled value prop like this, so remove value here
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    // placeholder removed, file inputs don't use placeholder
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Description
                  </label>
                  <textarea
                    name="description"
                    value={profile.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tell us about your company, your mission, and values"
                  />
                </div>
              </div>

              {/* Section 2: Cover Photos */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Cover Photos
                </h2>

                <div className="space-y-5">
                  {profile.coverPhotos.length > 0 && (
                    <div className="space-y-3">
                      {profile.coverPhotos.map((photo, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded border"
                        >
                          <div>
                            <p className="font-medium">
                              {photo.title || `Cover Photo ${index + 1}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {photo.type} - {photo.url.substring(0, 30)}...
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeCoverPhoto(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Photo 
                      </label>
                      <input
                        type="file"
                        value={newCoverPhoto.url}
                        onChange={(e) =>
                          setNewCoverPhoto({
                            ...newCoverPhoto,
                            url: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/cover-photo.jpg"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Media Type
                        </label>
                        <select
                          value={newCoverPhoto.type}
                          onChange={(e) =>
                            setNewCoverPhoto({
                              ...newCoverPhoto,
                              type: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="image">Image</option>
                          <option value="video">Video</option>
                          <option value="3d">3D Tour</option>
                        </select>
                      </div> */}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title
                        </label>
                        <input
                          type="text"
                          value={newCoverPhoto.title}
                          onChange={(e) =>
                            setNewCoverPhoto({
                              ...newCoverPhoto,
                              title: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Cover photo title"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={addCoverPhoto}
                      className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Cover Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 3: Gallery */}
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Gallery
                </h2>

                <div className="space-y-5">
                  {profile.gallery.length > 0 && (
                    <div className="space-y-3">
                      {profile.gallery.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded border"
                        >
                          <div>
                            <p className="font-medium">
                              {item.title || `Gallery Item ${index + 1}`}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.type} - {item.url.substring(0, 30)}...
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeGalleryItem(index)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gallery
                      </label>
                      <input
                        type="file"
                        value={newGalleryItem.url}
                        onChange={(e) =>
                          setNewGalleryItem({
                            ...newGalleryItem,
                            url: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/gallery-item.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={newGalleryItem.title}
                        onChange={(e) =>
                          setNewGalleryItem({
                            ...newGalleryItem,
                            title: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Gallery item title"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={addGalleryItem}
                      className="flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Add Gallery Item
                    </button>
                  </div>
                </div>
              </div>
              {/* Section 4: Contact Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Contact Information
                </h2>

                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </label>
                      <input
                        type="url"
                        name="website"
                        value={profile.website}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="contact@yourcompany.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+91 9876543210"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-gray-800">
                      Address
                    </h3>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={profile.address.street}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          name="address.city"
                          value={profile.address.city}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Mumbai"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          name="address.state"
                          value={profile.address.state}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Maharashtra"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Pincode
                        </label>
                        <input
                          type="text"
                          name="address.pincode"
                          value={profile.address.pincode}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="400001"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Features */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Company Features
                </h2>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {profile.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                      >
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addFeature()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a feature (e.g. RERA Registered)"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 6: Services Offered */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Services Offered
                </h2>

                <div className="space-y-5">
                  <div className="flex flex-wrap gap-2">
                    {profile.servicesOffered.map((service, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {service}
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="ml-1.5 inline-flex text-green-500 hover:text-green-700 focus:outline-none"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="flex">
                    <input
                      type="text"
                      value={newService}
                      onChange={(e) => setNewService(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addService()}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Add a service (e.g. Apartments)"
                    />
                    <button
                      type="button"
                      onClick={addService}
                      className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* Section 7: Social Links */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Social Media Links
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Facebook
                    </label>
                    <div className="flex">
                      {/* <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  facebook.com/
                </span> */}
                      <input
                        type="text"
                        name="socialLinks.facebook"
                        value={profile.socialLinks.facebook}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="facebook.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn
                    </label>
                    <div className="flex">
                      {/* <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  linkedin.com/company/
                </span> */}
                      <input
                        type="text"
                        name="socialLinks.linkedin"
                        value={profile.socialLinks.linkedin}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="linkedin.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Instagram
                    </label>
                    <div className="flex">
                      {/* <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  instagram.com/
                </span> */}
                      <input
                        type="text"
                        name="socialLinks.instagram"
                        value={profile.socialLinks.instagram}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="instagram.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube
                    </label>
                    <div className="flex">
                      {/* <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-md">
                  youtube.com/
                </span> */}
                      <input
                        type="text"
                        name="socialLinks.youtube"
                        value={profile.socialLinks.youtube}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="youtube.com"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 8: Support Information */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Support Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      name="supportInfo.contactPerson"
                      value={profile.supportInfo.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Name of the support contact person"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Email
                      </label>
                      <input
                        type="email"
                        name="supportInfo.supportEmail"
                        value={profile.supportInfo.supportEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="support@yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Support Phone
                      </label>
                      <input
                        type="tel"
                        name="supportInfo.supportPhone"
                        value={profile.supportInfo.supportPhone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
