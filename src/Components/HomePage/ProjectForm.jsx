import { useState } from "react";
import { useForm } from "react-hook-form";

const ProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [media, setMedia] = useState({
    photos: [],
    videos: [],
    "3DVideo": [],
  });
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");

  const onSubmit = (data) => {
    const projectData = {
      ...data,
      amenities,
      media,
    };
    console.log(projectData); // Replace with your API call
  };

  const handleMediaUpload = (type, files) => {
    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.split("/")[0],
      title: file.name,
    }));

    setMedia((prev) => ({
      ...prev,
      [type]: [...prev[type], ...newMedia],
    }));
  };

  const addAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      setAmenities([...amenities, newAmenity.trim()]);
      setNewAmenity("");
    }
  };

  const removeAmenity = (index) => {
    setAmenities(amenities.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-3xl ms-3 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Project Basic Info */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-700">
            Basic Information
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name*
            </label>
            <input
              {...register("projectName", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project name"
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-red-600">
                Project name is required
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                {...register("location.city")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Area
              </label>
              <input
                {...register("location.area")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Area"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode
              </label>
              <input
                {...register("location.pincode")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Pincode"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Property Type*
            </label>
            <select
              {...register("propertyType", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select property type</option>
              <option value="Plot">Plot</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
            </select>
            {errors.propertyType && (
              <p className="mt-1 text-sm text-red-600">
                Property type is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Possession Date
            </label>
            <input
              type="date"
              {...register("possessionDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-700">Description</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your project in detail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specifications
            </label>
            <textarea
              {...register("specifications")}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List project specifications"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-4 border-b pb-6">
          <h2 className="text-xl font-semibold text-gray-700">Amenities</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add amenity"
            />
            <button
              type="button"
              onClick={addAmenity}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{amenity}</span>
                <button
                  type="button"
                  onClick={() => removeAmenity(index)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Media */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Media</h2>

          <div className="space-y-6">
            {/* Photos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  handleMediaUpload("photos", Array.from(e.target.files))
                }
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="block w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    Upload photos
                  </span>
                </div>
              </label>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                {media.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() =>
                          setMedia((prev) => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index),
                          }))
                        }
                        className="text-white p-1 rounded-full hover:bg-red-500"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Videos
              </label>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) =>
                  handleMediaUpload("videos", Array.from(e.target.files))
                }
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="block w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    Upload videos
                  </span>
                </div>
              </label>
              <div className="mt-4 grid grid-cols-1 gap-4">
                {media.videos.map((video, index) => (
                  <div key={index} className="relative group">
                    <video
                      src={video.url}
                      className="w-full h-32 object-cover rounded-md"
                      controls
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() =>
                          setMedia((prev) => ({
                            ...prev,
                            videos: prev.videos.filter((_, i) => i !== index),
                          }))
                        }
                        className="text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Videos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                3D Videos
              </label>
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={(e) =>
                  handleMediaUpload("3DVideo", Array.from(e.target.files))
                }
                className="hidden"
                id="3dvideo-upload"
              />
              <label
                htmlFor="3dvideo-upload"
                className="block w-full px-4 py-12 border-2 border-dashed border-gray-300 rounded-md text-center cursor-pointer hover:border-blue-500"
              >
                <div className="flex flex-col items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                    />
                  </svg>
                  <span className="mt-2 text-sm font-medium text-gray-600">
                    Upload 3D videos
                  </span>
                </div>
              </label>
              <div className="mt-4 grid grid-cols-1 gap-4">
                {media["3DVideo"].map((video, index) => (
                  <div key={index} className="relative group">
                    <video
                      src={video.url}
                      className="w-full h-32 object-cover rounded-md"
                      controls
                    />
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={() =>
                          setMedia((prev) => ({
                            ...prev,
                            "3DVideo": prev["3DVideo"].filter(
                              (_, i) => i !== index
                            ),
                          }))
                        }
                        className="text-white"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
