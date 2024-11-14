import React from "react";

export default function Navbar({ onLoginClick, onSignUpClick }) {
  return (
    <nav className="w-full px-6 py-2 bg-gray-600 flex justify-between items-center">
      <div className="bg-pink-600 p-2 rounded-full w-16 h-16 flex items-center justify-center">
        <p className="text-bold text-white">Logo</p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={onLoginClick}
          className="text-white px-5 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg flex justify-center items-center"
        >
          Login
        </button>
        <button
          onClick={onSignUpClick}
          className="text-white px-5 py-3 bg-pink-600 hover:bg-pink-500 rounded-lg flex justify-center items-center"
        >
          Signup
        </button>
      </div>
    </nav>
  );
}