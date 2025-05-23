import { useEffect, useState } from "react";

const Popup = ({ selectedLocation, setSelectedLocation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [hasShown, setHasShown] = useState(false);

  // Mock city data
  const popularCities = [
    "Mumbai",
    "Delhi-NCR",
    "Bengaluru",
    "Hyderabad",
    "Ahmedabad",
    "Chandigarh",
    "Chennai",
    "Pune",
    "Kolkata",
    "Kochi",
  ];

  const allCities = [
    ...popularCities,
    "Jaipur",
    "Lucknow",
    "Nagpur",
    "Indore",
    "Bhopal",
    "Patna",
    "Thiruvananthapuram",
    "Bhubaneswar",
    "Coimbatore",
    "Visakhapatnam",
  ];

  // Function to detect user's location
  const detectLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const mockApiCall = () => {
            return new Promise((resolve) => {
              setTimeout(() => {
                const randomCity =
                  popularCities[
                    Math.floor(Math.random() * popularCities.length)
                  ];
                resolve(randomCity);
              }, 1000);
            });
          };

          const city = await mockApiCall();
          setSelectedLocation(city);
          setIsLocating(false);
          setIsVisible(false);
          setHasShown(true);
        } catch (error) {
          setLocationError("Could not determine your city");
          setIsLocating(false);
        }
      },
      (error) => {
        setLocationError("Unable to retrieve your location");
        setIsLocating(false);
      }
    );
  };

  // Prevent scrolling when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  // Show popup only once when component mounts
  useEffect(() => {
    if (!hasShown && !selectedLocation) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Show after 1 second delay

      return () => clearTimeout(timer);
    }
  }, [hasShown, selectedLocation]);

  const handleClose = () => {
    setIsVisible(false);
    setHasShown(true);
  };

  const handleCitySelect = (city) => {
    setSelectedLocation(city);
    setIsVisible(false);
    setHasShown(true);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-500 ease-in-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="bg-white shadow-xl rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Select Your City</h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search for your city"
                className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={detectLocation}
              disabled={isLocating}
              className={`px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isLocating
                  ? "bg-gray-200 text-gray-600"
                  : "bg-blue-100 text-blue-600 hover:bg-blue-200"
              }`}
            >
              {isLocating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
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
                  Detecting...
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Detect my location
                </>
              )}
            </button>
          </div>

          {selectedLocation && (
            <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded-md">
              Your current location:{" "}
              <span className="font-semibold">{selectedLocation}</span>
            </div>
          )}

          {locationError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              {locationError}
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Popular Cities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {(showAllCities ? allCities : popularCities).map(
                (city, index) => (
                  <button
                    key={index}
                    className={`p-2 text-left hover:bg-gray-100 rounded-md transition-colors ${
                      selectedLocation === city
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                    onClick={() => handleCitySelect(city)}
                  >
                    {city}
                  </button>
                )
              )}
            </div>
          </div>

          <button
            onClick={() => setShowAllCities(!showAllCities)}
            className="text-blue-600 font-medium hover:underline"
          >
            {showAllCities ? "Show Less" : "View All Cities"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
