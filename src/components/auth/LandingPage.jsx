import React from "react";
import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-100 tracking-wide drop-shadow-lg">
        Welcome to Our Application
      </h1>
      <p className="text-base md:text-xl mb-10 text-center max-w-2xl leading-relaxed text-gray-300">
        Empower your productivity with our state-of-the-art tools. Seamlessly manage communications and schedules to stay ahead in a competitive world.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <Link
          to="/signup"
          className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 focus:ring-4 focus:ring-blue-400 focus:outline-none"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-transparent border border-gray-300 text-gray-300 font-semibold py-3 px-8 rounded-lg shadow-md hover:border-blue-600 hover:text-blue-600 transition-all duration-300 focus:ring-4 focus:ring-blue-400 focus:outline-none"
        >
          Log In
        </Link>
      </div>
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-100 text-center">
          Test User Credentials
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="bg-gray-900 p-4 rounded-md">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Username:</span> TestUser
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Password:</span> 123456789
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded-md">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Username:</span> TestAdmin
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Password:</span> 123456789
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
