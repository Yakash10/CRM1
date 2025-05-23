import { useState } from "react";

const UnitForm = () => {
  const [formData, setFormData] = useState({
    floor: "",
    unitNumber: "",
    bhkType: "",
    sizeSqFt: "",
    facing: "",
    price: {
      totalPrice: "",
      pricePerSqft: "",
    },
    availability: "available",
    photos: [{ url: "", type: "", title: "" }],
    videos: [{ url: "", type: "", title: "" }],
    plan3D: [{ url: "", type: "", title: "" }],
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      price: {
        ...prev.price,
        [name]: value,
      },
    }));
  };

  const handleMediaChange = (type, index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addMediaItem = (type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: [...prev[type], { url: "", type: "", title: "" }],
    }));
  };

  const removeMediaItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Submit logic here
  };

  return (
    <div className="max-w-2xl ms-3 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Unit Information
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Basic Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Floor ID *
            </label>
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              placeholder="Enter floor ID (required)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Number
            </label>
            <input
              type="text"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleChange}
              placeholder="Enter unit number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BHK Type
            </label>
            <input
              type="text"
              name="bhkType"
              value={formData.bhkType}
              onChange={handleChange}
              placeholder="e.g., 2BHK, 3BHK"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size (Sq Ft)
            </label>
            <input
              type="number"
              name="sizeSqFt"
              value={formData.sizeSqFt}
              onChange={handleChange}
              placeholder="Enter size in square feet"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facing Direction
            </label>
            <input
              type="text"
              name="facing"
              value={formData.facing}
              onChange={handleChange}
              placeholder="Enter facing direction (e.g., North, South)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Price Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Price Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price
            </label>
            <input
              type="number"
              name="totalPrice"
              value={formData.price.totalPrice}
              onChange={handlePriceChange}
              placeholder="Enter total price"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Per Sqft
            </label>
            <input
              type="number"
              name="pricePerSqft"
              value={formData.price.pricePerSqft}
              onChange={handlePriceChange}
              placeholder="Enter price per square foot"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Availability */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Availability
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="available">Available</option>
              <option value="booked">Booked</option>
              <option value="sold">Sold</option>
            </select>
          </div>
        </div>

        {/* Media Sections */}
        {["photos", "videos", "plan3D"].map((mediaType) => (
          <div key={mediaType} className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
              {mediaType.charAt(0).toUpperCase() + mediaType.slice(1)}
            </h2>

            {formData[mediaType].map((item, index) => (
              <div
                key={index}
                className="space-y-3 p-4 border border-gray-200 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">
                    {mediaType.slice(0, -1)} {index + 1}
                  </h3>
                  {formData[mediaType].length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMediaItem(mediaType, index)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image
                  </label>
                  <input
                    type="file"
                    value={item.url}
                    onChange={(e) =>
                      handleMediaChange(mediaType, index, "url", e.target.value)
                    }
                    placeholder={`Enter ${mediaType.slice(0, -1)} URL`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type
                  </label>
                  <input
                    type="text"
                    value={item.type}
                    onChange={(e) =>
                      handleMediaChange(
                        mediaType,
                        index,
                        "type",
                        e.target.value
                      )
                    }
                    placeholder={`Enter ${mediaType.slice(0, -1)} type`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) =>
                      handleMediaChange(
                        mediaType,
                        index,
                        "title",
                        e.target.value
                      )
                    }
                    placeholder={`Enter ${mediaType.slice(0, -1)} title`}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => addMediaItem(mediaType)}
              className="mt-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-sm"
            >
              Add {mediaType.slice(0, -1)}
            </button>
          </div>
        ))}

        {/* Description */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-2">
            Description
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter detailed description of the unit"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 text-end">
          <button
            type="submit"
            className="w-[250px] text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit Unit Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default UnitForm;
