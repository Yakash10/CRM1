import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showSignup, setShowSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form states
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupCompanyName, setSignupCompanyName] = useState("");
  const [signupRole, setSignupRole] = useState("");

  const [message, setMessage] = useState("");

  const images = [
    {
      url: "https://media.istockphoto.com/id/488120139/photo/modern-real-estate.jpg?s=612x612&w=0&k=20&c=88jk1VLSoYboMmLUx173sHs_XrZ9pH21as8lC7WINQs=",
      text: (
        <a
          href="https://example.com/apartments"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Explore Luxury Apartments
        </a>
      ),
    },
    {
      url: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/560522500.jpg?k=ff828719eaa74e28da1470e46ececabe7f4db037594ee0fd3d23a142084a7827&o=&hp=1",
      text: (
        <a
          href="https://example.com/villas"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Discover Premium Villas
        </a>
      ),
    },
    {
      url: "https://media.istockphoto.com/id/1026205392/photo/beautiful-luxury-home-exterior-at-twilight.jpg?s=612x612&w=0&k=20&c=HOCqYY0noIVxnp5uQf1MJJEVpsH_d4WtVQ6-OwVoeDo=",
      text: (
        <a
          href="https://example.com/homes"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Find Your Dream Home
        </a>
      ),
    },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://crm-pdgp.onrender.com/auth/login", {
        identifier: loginEmail, // can be email or username
        password: loginPassword,
      });

      const data = response.data;
      setMessage("Login successful!");

      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMessage(error.response?.data?.msg || "Login failed. Please try again later.");
    }
  };

  const handleSignup = async () => {
    if (!signupEmail || !signupUsername || !signupPassword || !signupRole) {
      setMessage("Email, Username, Password and Role are required");
      return;
    }

    if (signupRole === "directBuilder" && !signupCompanyName) {
      setMessage("Company Name is required for DirectBuilder role");
      return;
    }

    try {
      const response = await axios.post("https://crm-pdgp.onrender.com/auth/register", {
        email: signupEmail,
        username: signupUsername,
        password: signupPassword,
        role: signupRole,
        phone: signupPhone || "", // optional, send empty string if not provided
        companyName: signupRole === "directBuilder" ? signupCompanyName : "", // conditional
      });

      setMessage(response.data.msg);
      // optionally clear inputs or redirect here
    } catch (error) {
      console.error("Signup error response:", error.response?.data);
      setMessage(error.response?.data?.msg || "Signup failed. Please try again later.");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 font-sans px-4 py-10">
      <div className="relative w-full max-w-7xl h-[700px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ${
            showSignup ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* Login Panel */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Hi there!</h1>
              <p className="mb-8 text-gray-500">Welcome</p>

              {/* Removed Google login button here */}

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded-md p-3 mb-4"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />

                <div className="relative mb-2">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md p-3 pr-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <div className="text-right text-sm mb-6">
                  <a href="#" className="text-blue-500 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full mb-4 hover:opacity-90 transition"
                >
                  Log In
                </button>
              </form>

              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => {
                    setShowSignup(true);
                    setMessage("");
                  }}
                >
                  Sign up
                </button>
              </p>

              {message && !showSignup && (
                <p className="mt-4 text-center text-sm text-red-600">{message}</p>
              )}
            </div>
          </div>

          {/* Signup Panel */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Join Us!</h1>
              <p className="mb-8 text-gray-500">Create an account to continue</p>

              {/* Removed Google signup button here */}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSignup();
                }}
              >
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full border border-gray-300 rounded-md p-3 mb-4"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-300 rounded-md p-3 mb-4"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
                <div className="relative mb-4">
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full border border-gray-300 rounded-md p-3 pr-10"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                  >
                    {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
<div className="relative w-full mb-4">
  <select
    value={signupRole}
    onChange={(e) => setSignupRole(e.target.value)}
    required
    className={`w-full border border-gray-300 rounded-md p-3 pr-10 appearance-none ${
      signupRole === "" ? "text-gray-400" : "text-black"
    }`}
  >
    <option value="" disabled hidden>
      Select role
    </option>
    <option value="user">User</option>
    <option value="admin">Admin</option>
    <option value="directBuilder">Direct Builder</option>
  </select>
  
  {/* Custom arrow */}
  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
    <svg
      className="w-4 h-4 text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</div>




                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full border border-gray-300 rounded-md p-3 mb-4"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                />

                {signupRole === "directBuilder" && (
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full border border-gray-300 rounded-md p-3 mb-6"
                    value={signupCompanyName}
                    onChange={(e) => setSignupCompanyName(e.target.value)}
                    required
                  />
                )}

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-full mb-4 hover:opacity-90 transition"
                >
                  Sign Up
                </button>
              </form>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => {
                    setShowSignup(false);
                    setMessage("");
                  }}
                >
                  Log in
                </button>
              </p>

              {message && showSignup && (
                <p className="mt-4 text-center text-sm text-red-600">{message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right side image + text */}
        <div className="absolute top-0 right-0 w-1/2 h-full overflow-hidden rounded-r-2xl">
          <img
            src={images[currentImageIndex].url}
            alt="Real Estate"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute bottom-12 left-12 text-white text-lg sm:text-xl font-semibold">
            {images[currentImageIndex].text}
          </div>
        </div>
      </div>
    </div>
  );
}
