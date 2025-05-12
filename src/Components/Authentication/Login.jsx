import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const images = [
    {
      url: "https://images.ottplay.com/images/ajith-kumar-in-good-bad-ugly-1723179833.jpg",
      text: `<a href="https://example.com" target="_blank">Explore the Universe with GBU Mameey</a>`,
    },
    {
      url: "https://tse2.mm.bing.net/th?id=OIF.VjNPH3uC8hm%2bSE6omK8ISA&pid=Api&P=0&h=180",
      text: `<a href="https://www.youtube.com/watch?v=p4CSfe72Xrw" target="_blank">This is strictly made for fans</a>`,
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.ybwXgx1e9xD121k9zf_qOwHaFG&pid=Api&P=0&h=180",
      text: `<a href="https://example.com/community" target="_blank">Join the GBU Mameey community</a>`,
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

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 font-sans px-4 py-10">
      <div className="relative w-full max-w-7xl h-[600px] bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div
          className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ${
            showSignup ? "-translate-x-1/2" : "translate-x-0"
          }`}
        >
          {/* Login Panel */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Hi there!</h1>
              <p className="mb-8 text-gray-500">Welcome to GBU world Mameey</p>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 text-gray-600 mb-4 hover:bg-gray-100 transition">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google Icon"
                  className="h-5 w-5"
                />
                Log in with Google
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <input
                type="email"
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-md p-3 mb-4"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <div className="relative mb-2">
                <input
                  type={showLoginPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md p-3 pr-10"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
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

              <button className="w-full bg-black text-white py-3 rounded-full mb-4 hover:opacity-90 transition">
                Log In
              </button>

              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setShowSignup(true)}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>

          {/* Signup Panel */}
          <div className="w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 bg-white">
            <div className="w-full max-w-md">
              <h1 className="text-4xl sm:text-5xl font-bold mb-2">Join Us!</h1>
              <p className="mb-8 text-gray-500">
                Create your GBU Mameey account
              </p>

              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-3 text-gray-600 mb-4 hover:bg-gray-100 transition">
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google Icon"
                  className="h-5 w-5"
                />
                Sign up with Google
              </button>

              <input
                type="text"
                placeholder="User Name"
                className="w-full border border-gray-300 rounded-md p-3 mb-4"
                value={signupUsername}
                onChange={(e) => setSignupUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-3 mb-4"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
              />

              <div className="relative mb-6">
                <input
                  type={showSignupPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 rounded-md p-3 pr-10"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowSignupPassword(!showSignupPassword)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
                >
                  {showSignupPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-full mb-4 hover:opacity-90 transition">
                Sign Up
              </button>

              <p className="text-sm text-center">
                Already have an account?{" "}
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => setShowSignup(false)}
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Sliding Image Panel */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-cover bg-center text-white p-6 transition-all duration-700"
          style={{
            backgroundImage: `url(${images[currentImageIndex].url})`,
          }}
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end gap-4">
              <button
                className="border px-4 py-1 rounded-full text-sm hover:bg-white hover:text-black transition"
                onClick={() => setShowSignup(true)}
              >
                Sign Up
              </button>
              <button className="px-4 py-1 rounded-full text-sm hover:bg-white hover:text-black transition">
                Join Us
              </button>
            </div>
            <div>
              <h2
                className="text-xl sm:text-2xl font-semibold max-w-xs mb-2 transition-opacity duration-700"
                dangerouslySetInnerHTML={{
                  __html: images[currentImageIndex].text,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
