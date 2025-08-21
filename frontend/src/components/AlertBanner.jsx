import React, { useEffect } from "react";

function AlertBanner({ type = "info", message, onClose }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onClose(); // auto-dismiss after 5s
    }, 5000);
    return () => clearTimeout(timeout);
  }, [onClose]);

  const typeStyles = {
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-yellow-500 text-black",
    info: "bg-blue-600",
  };

  return (
    <div
      className={`w-full max-w-md mx-auto text-white px-4 py-3 rounded-xl shadow-md mb-4 animate-fade-in-up transition-all duration-300 ${typeStyles[type]}`}
    >
      <p className="text-sm text-center">{message}</p>
    </div>
  );
}
export default AlertBanner;