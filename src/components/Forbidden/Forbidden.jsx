import React from "react";
import { Link } from "react-router";
import { Player } from "@lottiefiles/react-lottie-player";
import animation from "../../animations/Negative_verification.json";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-3xl w-full text-center">
        {/* Animation */}
        <div className="flex justify-center">
          <Player
            autoplay
            loop
            src={animation}
            style={{ height: "320px", width: "320px" }}
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mt-4">
          You Are Forbidden to Access This Page
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-lg mt-4">
          Please contact the administrator if you believe this is an error.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <Link
            to="/"
            className="btn bg-lime-400 hover:bg-lime-500 border-none text-black text-lg px-8"
          >
            Go to Home
          </Link>

          <Link
            to="/dashboard"
            className="btn bg-teal-900 hover:bg-teal-800 border-none text-white text-lg px-8"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
