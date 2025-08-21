import React from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ onDownload, onPause, onResume, onClear, isOpen, onClose }) {
  const location = useLocation();

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full w-64 bg-slate-900 shadow-xl transform transition-transform duration-300 ease-in-out 
        md:static md:translate-x-0 md:rounded-2xl md:shadow-none md:w-60 p-5 space-y-4 text-white
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      {/* Mobile close button */}
      <div className="flex justify-between items-center md:hidden mb-4">
        <h2 className="text-lg font-bold">🧭 Controls</h2>
        <button
          onClick={onClose}
          className="text-white text-2xl font-bold hover:text-red-400"
        >
          ×
        </button>
      </div>

      {/* Navigation Links */}
      <Link
        to="/"
        className={`block px-4 py-2 rounded font-semibold transition ${
          location.pathname === "/" ? "bg-slate-700 text-white" : "hover:bg-slate-800 text-gray-300"
        }`}
      >
        🛰️ Dashboard
      </Link>

      <Link
        to="/telemetry"
        className={`block px-4 py-2 rounded font-semibold transition ${
          location.pathname === "/telemetry" ? "bg-slate-700 text-white" : "hover:bg-slate-800 text-gray-300"
        }`}
      >
        📊 Telemetry Table
      </Link>

      {/* Action Buttons */}
      <button
        className="bg-green-600 hover:bg-green-700 transition rounded-xl px-4 py-2 font-semibold w-full"
        onClick={onDownload}
      >
        📥 Download Telemetry
      </button>

      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-black transition rounded-xl px-4 py-2 font-semibold w-full"
        onClick={onPause}
      >
        ⏸️ Pause Stream
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-600 transition rounded-xl px-4 py-2 font-semibold w-full"
        onClick={onResume}
      >
        ▶️ Resume Stream
      </button>

      <button
        className="bg-red-600 hover:bg-red-700 transition rounded-xl px-4 py-2 font-semibold w-full"
        onClick={onClear}
      >
        🧹 Clear Charts
      </button>
    </div>
  );
}
export default Sidebar;