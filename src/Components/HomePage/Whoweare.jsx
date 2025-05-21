import React, { useState } from "react";
import whoweare from "./Assets/whoweare.png";

const Whoweare = () => {
  const [showMore, setShowMore] = useState(false);

  // Toggle 'Show more' content
  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="w-full max-w-7xl mt-20 px-6 md:px-12 mx-auto">
      <div className="flex flex-col md:flex-row-reverse items-center gap-20 text-center md:text-left">
        {/* Left Section (Image) */}
        <div className="md:w-1/2">
          <img
            src={whoweare}
            alt="Real Estate Building"
            className="w-full h-[390px] object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Right Section (Text) */}
        <div className="md:w-1/2">
          <p className="text-sm text-gray-500 tracking-widest uppercase border-b pb-1 w-fit">
            Properties
          </p>
          <h2 className="text-4xl font-semibold leading-snug">
            Premium Properties in the Best Locations
          </h2>
          <p className="text-gray-600">
            Our properties, located in prime areas, boast unique designs and
            aspirational lifestyles within vibrant Emaar communities, all
            seamlessly managed by Emaar Community Management's dedicated team.
          </p>

          <button
            className="bg-gray-900 text-white uppercase tracking-wide py-3 px-6 rounded-md mt-4"
            onClick={handleToggle}
          >
            {showMore ? "Show less" : "Know more"}
          </button>

          {/* Extra Content Toggle */}
          {showMore && (
            <div className="mt-4 text-gray-700">
              <p>
                Discover luxurious amenities, sustainable architecture, and
                thoughtfully designed spaces that reflect modern lifestyles.
                From waterfront residences to urban retreats, each property
                offers a unique experience tailored to your dreams.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Whoweare;
