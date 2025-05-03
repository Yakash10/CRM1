import React, { useState } from "react";
import Select from "react-select";
import bookingimage from "../ClientBookingPage/Assets/bookingimage.png";
import Floorplan11 from "../ClientBookingPage/Assets/Floorplan11.jpg";
import Floorplan12 from "../ClientBookingPage/Assets/Floorplan11.jpg";
import houseInHands from "../ClientBookingPage/Assets/houseInHands.avif";

import {
  FaBuilding as FaBuildingPhase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaRulerCombined,
  FaHome,
  FaBuilding,
} from "react-icons/fa";

/* 
  ========== CUSTOM REACT-SELECT STYLES ==========
  These styles ensure the Phase/Floor dropdown menus overlap outside their container,
  share the same fixed height, and scroll internally.
*/
const customSelectStyles = {
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  control: (provided) => ({
    ...provided,
    minHeight: "40px",
  }),
  valueContainer: (provided) => ({
    ...provided,
    minHeight: "40px",
    padding: "0 8px",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
  }),
  menu: (provided) => ({
    ...provided,
    maxHeight: "200px",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "200px",
    overflowY: "auto",
  }),
};

function ArihantPage() {
  /* ========== TOP SECTION (Read More / Read Less) ========== */
  const [isExpanded, setIsExpanded] = useState(false);

  const textPart1 = `One of our finest creations, in a neighborhood that checks all the boxes.
    Staying at Hunters Road means you are exceptionally close to business,
    as it's adjacent to Purasawakkam, one of the largest commercial markets in Chennai.

    Arihant Vanya Vilas is exceptional not just in its exterior facade,
    but equally stunning in its meticulous planning and every detail.`;

  const textPart2 = `Only 45 bespoke residences that allow you design customisations,
    and 8 of them come with private terraces. The project is planned as per vastu
    around a well designed central courtyard. Tucked away from the main road,
    your home is in a quiet and clean sanctuary. Enter the 10 ft driveway
    and you will feel like a dream coming true.`;

  const handleToggle = () => setIsExpanded(!isExpanded);

  /* 
    ========== PHASE & FLOOR DROPDOWNS WITH 6 SPACES (S1–S6) ==========
    Each floor now has 6 spaces. 
  */
  function generateFloors() {
    let floorsArr = [];
    for (let i = 1; i <= 48; i++) {
      floorsArr.push({
        id: `floor${i}`,
        name: `Floor ${i}`,
        spaces: [
          { id: "s1", label: "S1", available: true },
          { id: "s2", label: "S2", available: true },
          { id: "s3", label: "S3", available: false },
          { id: "s4", label: "S4", available: true },
          { id: "s5", label: "S5", available: true },
          { id: "s6", label: "S6", available: false },
        ],
      });
    }
    return floorsArr;
  }

  // Phase options (6 Phases)
  const phaseOptions = Array.from({ length: 6 }, (_, i) => ({
    value: `phase${i + 1}`,
    label: `Phase ${i + 1}`,
  }));

  // Floors array of 48, each with 6 spaces
  const allFloors = generateFloors();

  // React-Select-friendly floor options
  const floorOptions = allFloors.map((f) => ({
    value: f.id,
    label: f.name,
  }));

  // Selected Phase & Floor states
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);

  const handlePhaseChange = (phaseOption) => {
    setSelectedPhase(phaseOption);
    setSelectedFloor(null);
    setSelectedSpace(null);
  };

  const handleFloorChange = (floorOption) => {
    const floorData = allFloors.find((f) => f.id === floorOption.value);
    setSelectedFloor(floorData);
    setSelectedSpace(null);
  };

  /* ========== SPACE SELECTION & HOVER STATES ========== */
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [hoveredSpace, setHoveredSpace] = useState(null);

  const handleSpaceSelect = (space) => {
    if (space.available) {
      setSelectedSpace(space);
    }
  };

  /* ========== MODAL STATES FOR IMAGE ZOOM ========== */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [scale, setScale] = useState(1);

  const openModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
    setScale(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  const handleZoomIn = () => setScale((prev) => prev + 0.25);
  const handleZoomOut = () => setScale((prev) => Math.max(0.5, prev - 0.25));

  /* ========== BOOKING FORM STATE & HANDLER ========== */
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBookNow = () => {
    setShowBookingForm(true);
    setTimeout(() => {
      const formSection = document.getElementById("bookingFormSection");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="mx-auto bg-white">
      {/* ========== TOP SECTION ========== */}
      <div className="mx-auto p-4 flex flex-col lg:flex-row gap-6 bg-white items-start">
        {/* LEFT: Fixed-size image */}
        <div
          className="relative overflow-hidden"
          style={{ width: "800px", height: "500px" }}
        >
          <img
            src={bookingimage}
            alt="Arihant Vanya Vilas"
            style={{ animation: "zoomIn 1s ease-in-out forwards" }}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT: Fixed-size text container */}
        <div
          className="relative p-6 flex flex-col bg-white"
          style={{
            width: "800px",
            height: "500px",
            overflowY: isExpanded ? "auto" : "hidden",
          }}
        >
          <div className="flex items-center mb-4">
            <span className="text-yellow-600 uppercase font-semibold tracking-wide text-sm mr-2">
              About
            </span>
            <div className="flex-1 h-px bg-yellow-600" />
          </div>
          <h2
            className="text-2xl font-bold text-gray-800 mb-4 leading-snug"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            CasaGrand Vilas Purasawakkam, Chennai - Price, Floor Plans, Reviews
          </h2>

          <div className="text-sm text-gray-700 leading-relaxed">
            {textPart1
              .split("\n")
              .filter((p) => p.trim().length > 0)
              .map((paragraph, idx) => (
                <p key={idx} className="mb-4 last:mb-0">
                  {paragraph.trim()}
                </p>
              ))}
            {isExpanded && (
              <div className="mt-4">
                {textPart2
                  .split("\n")
                  .filter((p) => p.trim().length > 0)
                  .map((paragraph, idx) => (
                    <p key={idx} className="mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
              </div>
            )}
          </div>
          <button
            onClick={handleToggle}
            className="mt-4 text-[#C8A158] font-medium hover:underline self-start"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      </div>

      {/* ========== SVG FLOOR SELECTION SECTION ========== */}
      <div className="max-w-6xl mx-auto my-10 px-4 flex flex-col md:flex-row gap-6 justify-center">
        {/* LEFT: SVG Floor Plan */}
        <div className="md:w-2/3 bg-orange-50 shadow-md rounded-lg p-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
            Select Available Spaces
          </h2>

          {/* PHASE & FLOOR DROPDOWNS */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="w-full sm:w-1/2">
              <Select
                options={phaseOptions}
                value={selectedPhase}
                onChange={handlePhaseChange}
                placeholder="Select Phase"
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
            <div className="w-full sm:w-1/2">
              <Select
                options={floorOptions}
                value={
                  selectedFloor
                    ? { value: selectedFloor.id, label: selectedFloor.name }
                    : null
                }
                onChange={handleFloorChange}
                placeholder="Select Floor"
                isDisabled={!selectedPhase}
                styles={customSelectStyles}
                menuPortalTarget={document.body}
              />
            </div>
          </div>

          {/* Show the Floor Plan ONLY if a phase & floor are selected */}
          {selectedPhase && selectedFloor && (
            <div className="relative">
              {/* 
                Expanded viewBox to make room for the legend on the right side.
                The floor plan is arranged to fit 6 spaces in a 3 x 2 layout.
              */}
              <svg
                viewBox="0 0 900 550"
                className="w-full h-auto border border-gray-200 rounded-lg bg-white"
              >
                {/* Building Outline */}
                <rect
                  x="50"
                  y="50"
                  width="700"
                  height="400"
                  fill="#f5f5f5"
                  stroke="#333"
                  strokeWidth="2"
                />

                {/* Common Areas */}
                <rect
                  x="200"
                  y="100"
                  width="400"
                  height="100"
                  fill="#d1e7dd"
                  stroke="#333"
                  strokeWidth="1"
                />
                <text
                  x="400"
                  y="160"
                  textAnchor="middle"
                  fill="#333"
                  fontSize="20"
                >
                  Lobby
                </text>

                {/* Elevator (vertical text at right) */}
                <rect
                  x="680"
                  y="150"
                  width="50"
                  height="200"
                  fill="#b8d8e0"
                  stroke="#333"
                  strokeWidth="1"
                />
                <text
                  x="705"
                  y="250"
                  textAnchor="middle"
                  fill="#333"
                  fontSize="16"
                  fontWeight="bold"
                  transform="rotate(270, 705, 250)"
                >
                  Elevator
                </text>

                {/* Stairs */}
                <rect
                  x="100"
                  y="150"
                  width="50"
                  height="200"
                  fill="#e2e2e2"
                  stroke="#333"
                  strokeWidth="1"
                />
                <text
                  x="125"
                  y="250"
                  textAnchor="middle"
                  fill="#333"
                  fontSize="16"
                >
                  Stairs
                </text>

                {/* Spaces (S1..S6) in a 3x2 grid */}
                {selectedFloor.spaces.map((space, index) => {
                  // 3 columns, 2 rows
                  const col = index % 3;
                  const row = Math.floor(index / 3);
                  const x = 200 + col * 160;
                  const y = 250 + row * 100;
                  const width = 150;
                  const height = 80;

                  return (
                    <g
                      key={space.id}
                      onMouseEnter={() => setHoveredSpace(space)}
                      onMouseLeave={() => setHoveredSpace(null)}
                      onClick={() => handleSpaceSelect(space)}
                      style={{
                        cursor: space.available ? "pointer" : "not-allowed",
                      }}
                    >
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={
                          selectedSpace?.id === space.id
                            ? "pink" // pink fill if selected
                            : !space.available
                            ? "#e2e3e5"
                            : hoveredSpace?.id === space.id
                            ? "#d1e7dd"
                            : "#fff3cd"
                        }
                        stroke={
                          selectedSpace?.id === space.id
                            ? "#dc3545"
                            : !space.available
                            ? "#6c757d"
                            : "#ffc107"
                        }
                        strokeWidth={selectedSpace?.id === space.id ? "3" : "2"}
                      />
                      <text
                        x={x + width / 2}
                        y={y + height / 2 + 5}
                        textAnchor="middle"
                        fill={
                          selectedSpace?.id === space.id
                            ? "#dc3545"
                            : !space.available
                            ? "#6c757d"
                            : "#333"
                        }
                        fontSize="16"
                        fontWeight="bold"
                      >
                        {space.label}
                      </text>
                      {!space.available && (
                        <text
                          x={x + width / 2}
                          y={y + height / 2 + 25}
                          textAnchor="middle"
                          fill="#6c757d"
                          fontSize="12"
                        >
                          Booked
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Legend: outside building outline for clarity */}
                <g transform="translate(780,100)">
                  <rect
                    x="-10"
                    y="-10"
                    width="140"
                    height="130"
                    fill="#fff"
                    stroke="#ccc"
                    strokeWidth="1"
                    rx="8"
                    ry="8"
                  />
                  {/* Available */}
                  <rect
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    fill="#fff3cd"
                    stroke="#ffc107"
                    strokeWidth="1"
                  />
                  <text
                    x="30"
                    y="16"
                    fill="#333"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Available
                  </text>
                  {/* Booked */}
                  <rect
                    x="0"
                    y="40"
                    width="20"
                    height="20"
                    fill="#e2e3e5"
                    stroke="#6c757d"
                    strokeWidth="1"
                  />
                  <text
                    x="30"
                    y="56"
                    fill="#333"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Booked
                  </text>
                  {/* Selected (pink fill) */}
                  <rect
                    x="0"
                    y="80"
                    width="20"
                    height="20"
                    fill="pink"
                    stroke="#dc3545"
                    strokeWidth="2"
                  />
                  <text
                    x="30"
                    y="96"
                    fill="#333"
                    fontSize="14"
                    fontWeight="bold"
                  >
                    Selected
                  </text>
                </g>
              </svg>
            </div>
          )}
        </div>

        {/* RIGHT: Details Card (Fixed size, changes after space is clicked) */}
        <div
          className="md:w-1/3 border border-orange-100 bg-[#FFF8ED] rounded-lg shadow-sm"
          style={{ height: "500px" }}
        >
          <div className="h-full w-full p-6 overflow-y-auto">
            {selectedSpace ? (
              <>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  {selectedFloor?.name} - {selectedSpace.label}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                    <span>Location: Purasawakkam, Chennai</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-yellow-600 mr-2" />
                    <span>
                      Price: ₹
                      {selectedSpace.label === "S1"
                        ? "1.8CR"
                        : selectedSpace.label === "S2"
                        ? "1.9CR"
                        : "2CR"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-yellow-600 mr-2" />
                    <span>
                      Size:{" "}
                      {selectedSpace.label === "S1"
                        ? "1605 Sq.Ft"
                        : selectedSpace.label === "S2"
                        ? "1705 Sq.Ft"
                        : "1805 Sq.Ft"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-yellow-600 mr-2" />
                    <span>
                      Type: {selectedSpace.label === "S3" ? "3BHK" : "2BHK"}
                    </span>
                  </div>

                  {/* 
                    A small floor-plan image that the user can click to open in a zoomable modal.
                    You can customize the fallback image logic for other S3, S4, S5, S6 if needed.
                  */}
                  {(() => {
                    // Here we decide which image to show based on the selectedSpace
                    let selectedSpaceImage;
                    if (selectedSpace.label === "S1") {
                      selectedSpaceImage = Floorplan11;
                    } else if (selectedSpace.label === "S2") {
                      selectedSpaceImage = Floorplan12;
                    } else {
                      selectedSpaceImage = Floorplan11; // fallback
                    }

                    return (
                      <img
                        src={selectedSpaceImage}
                        alt="Selected Floor Plan"
                        className="mt-4 w-full h-auto object-cover max-h-40 border-2 border-[#C8A158] cursor-pointer"
                        onClick={() => openModal(selectedSpaceImage)}
                      />
                    );
                  })()}
                </div>
                <button
                  onClick={handleBookNow}
                  className="mt-6 px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase w-full"
                >
                  Book Now
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-orange-600 mb-4">
                  Arihant Vanya Vilas
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-yellow-600 mr-2" />
                    <span>Location: Purasawakkam, Chennai</span>
                  </div>
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-yellow-600 mr-2" />
                    <span>Price Range: ₹1.8CR - 2.5CR</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-yellow-600 mr-2" />
                    <span>Sizes: 1605 - 2819 Sq.Ft</span>
                  </div>
                  <div className="flex items-center">
                    <FaHome className="text-yellow-600 mr-2" />
                    <span>Units: 2BHK & 3BHK</span>
                  </div>
                  <div className="flex items-center">
                    <FaBuilding className="text-yellow-600 mr-2" />
                    <span>Type: Residential Apartment</span>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  Select a Phase & Floor from the dropdowns, then pick a space
                  from the interactive plan to view details and book.
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ========== FLOOR PLAN SECTION ========== */}
      <div className="bg-[#F8E9CA] py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="uppercase text-[#C8A158] text-sm font-semibold tracking-wide mb-1">
              Floor Plan
            </h2>
            <h3 className="text-2xl font-bold text-black">
              CasaGrand Vilas Floor Plans
            </h3>
          </div>

          <div className="flex flex-col md:flex-row gap-6 justify-center items-start">
            {/* Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
              <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                <img
                  src={Floorplan11}
                  alt="3 BHK Floor Plan"
                  className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                  onClick={() => openModal(Floorplan11)}
                />
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">3 BHK</h4>
              <p className="text-black mb-1">Size: 1605 Sq.Ft</p>
              <p className="text-black mb-1">Carpet Area: 1188 Sq.Ft</p>
              <hr className="border-t border-dotted border-gray-300 my-4" />
              <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                VIEW PRICE
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
              <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                <img
                  src={Floorplan12}
                  alt="3 BHK Floor Plan"
                  className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                  onClick={() => openModal(Floorplan12)}
                />
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">3 BHK</h4>
              <p className="text-black mb-1">Size: 1875 Sq.Ft</p>
              <p className="text-black mb-1">Carpet Area: 1388 Sq.Ft</p>
              <hr className="border-t border-dotted border-gray-300 my-4" />
              <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                VIEW PRICE
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 w-full md:w-1/3 text-center">
              <div className="mx-auto mb-4 w-auto h-56 flex items-center justify-center">
                <img
                  src={Floorplan11}
                  alt="4 BHK Floor Plan"
                  className="border-2 border-[#C8A158] object-contain max-h-full cursor-pointer"
                  onClick={() => openModal(Floorplan11)}
                />
              </div>
              <h4 className="text-lg font-semibold text-black mb-2">4 BHK</h4>
              <p className="text-black mb-1">Size: 2819 Sq.Ft</p>
              <p className="text-black mb-1">Carpet Area: 2086 Sq.Ft</p>
              <hr className="border-t border-dotted border-gray-300 my-4" />
              <button className="px-6 py-2 bg-[#FAE696] text-black font-semibold rounded hover:bg-[#C8A158]/90 uppercase">
                VIEW PRICE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ========== MODAL FOR IMAGE ZOOM ========== */}
      {isModalOpen && modalImage && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-60"
          onClick={closeModal}
        >
          <div
            className="relative bg-white p-4 rounded shadow-md max-w-4xl w-full h-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-black font-bold text-xl"
              onClick={closeModal}
            >
              &times;
            </button>
            <div className="flex justify-center mb-2 space-x-4">
              <button
                onClick={handleZoomOut}
                className="bg-gray-200 px-3 py-1 rounded font-semibold hover:bg-gray-300"
              >
                -
              </button>
              <button
                onClick={handleZoomIn}
                className="bg-gray-200 px-3 py-1 rounded font-semibold hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <div className="flex justify-center items-center overflow-auto">
              <img
                src={modalImage}
                alt="Floor Plan Zoom"
                style={{
                  transform: scale(`${scale}`),
                  transition: "transform 0.3s ease",
                }}
                className="max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========== BOOKING FORM SECTION ========== */}
      {showBookingForm && (
        <section
          id="bookingFormSection"
          className="w-full flex justify-center items-center p-4"
        >
          <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">
            {/* Left side - Image with slide in from left */}
            <div className="w-full md:w-1/2 h-[400px] md:h-[600px] animate-slide-in-left">
              <img
                src={houseInHands}
                alt="House in Hands"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side - Form with slide in from right */}
            <div className="w-full md:w-1/2 bg-white p-6 animate-slide-in-right">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                Booking Details
              </h2>
              <form className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="First name*"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                  />
                  <input
                    type="text"
                    placeholder="Last name*"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="United States ( US )*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Street Address*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Town / City*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <input
                  type="email"
                  placeholder="Email Address*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <input
                  type="text"
                  placeholder="Phone*"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <textarea
                  rows="3"
                  placeholder="Add Something"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>
      )}

      {/* ========== INLINE KEYFRAMES FOR ANIMATIONS ========== */}
      <style>
        {`
          @keyframes zoomIn {
            0% {
              transform: scale(0.9);
              opacity: 0;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          @keyframes dropdown {
            0% {
              opacity: 0;
              transform: translateY(-10px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-dropdown {
            animation: dropdown 0.5s ease forwards;
          }
          @keyframes slideInLeft {
            from {
              transform: translateX(-50px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          @keyframes slideInRight {
            from {
              transform: translateX(50px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          .animate-slide-in-left {
            animation: slideInLeft 0.8s ease forwards;
          }
          .animate-slide-in-right {
            animation: slideInRight 0.8s ease forwards;
          }
        `}
      </style>
    </div>
  );
}

export default ArihantPage;
