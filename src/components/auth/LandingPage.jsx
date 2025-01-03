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
      <div className="flex flex-wrap justify-center gap-6">
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
    </div>
  );
};

export default LandingPage;
