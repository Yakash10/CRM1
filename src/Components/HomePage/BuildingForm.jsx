import { useState } from "react";
import { useForm } from "react-hook-form";

const BuildingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [projects] = useState([
    { _id: "1", name: "Project Alpha" },
    { _id: "2", name: "Project Beta" },
    { _id: "3", name: "Project Gamma" },
  ]);

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity)) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const handleRemoveAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e, type) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file));

    if (type === "photo") {
      setPhotos([...photos, ...fileUrls]);
    } else {
      setVideos([...videos, ...fileUrls]);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      ...data,
      amenities,
      photos: photos.map((url) => url.split("/").pop()), // Store filenames only
      videos: videos.map((url) => url.split("/").pop()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    console.log("Building Data:", formData);
    alert("Building submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl ms-3 mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className=" py-4 px-6">
          <h2 className="text-2xl font-bold">
            Building Information
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Project Selection */}
          <div>
            <label
              htmlFor="project"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project*
            </label>
            <select
              id="project"
              {...register("project", { required: "Project is required" })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.project ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            {errors.project && (
              <p className="mt-1 text-sm text-red-600">
                {errors.project.message}
              </p>
            )}
          </div>

          {/* Building Name */}
          <div>
            <label
              htmlFor="buildingName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Building Name*
            </label>
            <input
              type="text"
              id="buildingName"
              {...register("buildingName", {
                required: "Building name is required",
              })}
              className={`w-full px-3 py-2 border rounded-md ${
                errors.buildingName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter building name"
            />
            {errors.buildingName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.buildingName.message}
              </p>
            )}
          </div>

          {/* Floors Count */}
          <div>
            <label
              htmlFor="floorsCount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number of Floors
            </label>
            <input
              type="number"
              id="floorsCount"
              {...register("floorsCount")}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter number of floors"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amenities
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newAmenity}
                onChange={(e) => setNewAmenity(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddAmenity()}
                placeholder="Add amenity (e.g. Gym, Pool)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            {amenities.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
                  >
                    <span className="text-sm">{amenity}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAmenity(index)}
                      className="ml-2 text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Photos Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Building Photos
            </label>
            <div className="flex items-center space-x-2">
              <label className="flex-1 cursor-pointer">
                <div className="px-3 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Select photos</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "photo")}
                    className="hidden"
                  />
                </div>
              </label>
              <span className="text-sm text-gray-500">
                {photos.length} selected
              </span>
            </div>
            {photos.length > 0 && (
              <div className="mt-3 grid grid-cols-3 gap-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Building ${index}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPhotos(photos.filter((_, i) => i !== index))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Videos Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Building Videos
            </label>
            <div className="flex items-center space-x-2">
              <label className="flex-1 cursor-pointer">
                <div className="px-3 py-2 border border-gray-300 rounded-md text-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Select videos</span>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, "video")}
                    className="hidden"
                  />
                </div>
              </label>
              <span className="text-sm text-gray-500">
                {videos.length} selected
              </span>
            </div>
            {videos.length > 0 && (
              <div className="mt-3 grid grid-cols-1 gap-2">
                {videos.map((video, index) => (
                  <div key={index} className="relative group">
                    <video
                      src={video}
                      className="w-full h-auto rounded"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setVideos(videos.filter((_, i) => i !== index))
                      }
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description")}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter building description..."
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setAmenities([]);
                setPhotos([]);
                setVideos([]);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Save Building
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuildingForm;
