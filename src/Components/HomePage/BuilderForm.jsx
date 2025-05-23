import { useState } from "react";

const BuilderProfileForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted profile:", profile);
    // Here you would typically send the data to your backend
    alert("Profile saved successfully!");
  };

  return (
    <div className="max-w-3xl ms-3 mx-auto p-6 bg-white rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Builder Profile</h1>
      <p className="text-gray-600 mb-6">
        Fill in your company details to create your builder profile
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Basic Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Basic Information
          </h2>

          <div className="space-y-5">
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
                Company Logo
              </label>
              <input
                type="file"
                name="logo"
                value={profile.logo}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/logo.jpg"
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
        </div>

        {/* Section 2: Cover Photos */}
        <div className="bg-gray-50 p-6 rounded-lg">
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
                    setNewCoverPhoto({ ...newCoverPhoto, url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/cover-photo.jpg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                </div>

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
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Gallery</h2>

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
              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Media
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
              </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Media 
                  </label>
                  <select
                    value={newGalleryItem.type}
                    onChange={(e) =>
                      setNewGalleryItem({
                        ...newGalleryItem,
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
              <h3 className="text-lg font-medium text-gray-800">Address</h3>

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

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save Builder Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuilderProfileForm;
