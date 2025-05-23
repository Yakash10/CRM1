import { useState } from "react";

const FloorFormComponent = () => {
  // Sample building data - replace with your actual data
  const [buildings] = useState([
    { _id: "1", name: "Main Building" },
    { _id: "2", name: "North Tower" },
    { _id: "3", name: "South Wing" },
  ]);

  const [formData, setFormData] = useState({
    building: "",
    floorNumber: "",
    totalUnits: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");

    try {
      // Here you would typically make an API call
      console.log("Submitting floor data:", formData);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmissionStatus("success");
      setFormData({
        building: "",
        floorNumber: "",
        totalUnits: "",
      });

      // Reset success message after 3 seconds
      setTimeout(() => setSubmissionStatus(null), 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md ms-3 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Floor Information
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please enter details about the floor
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {submissionStatus === "success" && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-md">
              Floor added successfully!
            </div>
          )}
          {submissionStatus === "error" && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              Error submitting form. Please try again.
            </div>
          )}

          <form className="mb-0 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="building"
                className="block text-sm font-medium text-gray-700"
              >
                Building *
              </label>
              <div className="mt-1">
                <select
                  id="building"
                  name="building"
                  value={formData.building}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a building</option>
                  {buildings.map((building) => (
                    <option key={building._id} value={building._id}>
                      {building.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="floorNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Floor Number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="floorNumber"
                  name="floorNumber"
                  value={formData.floorNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 1, 2, 3..."
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="totalUnits"
                className="block text-sm font-medium text-gray-700"
              >
                Total Units
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="totalUnits"
                  name="totalUnits"
                  value={formData.totalUnits}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Number of units on this floor"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submissionStatus === "submitting"}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  submissionStatus === "submitting"
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {submissionStatus === "submitting" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  "Save Floor"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FloorFormComponent;
