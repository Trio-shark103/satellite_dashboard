import React, { useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import DashboardHeader from "./components/DashboardHeader";
import Footer from "./components/Footer";
import AlertBanner from "./components/AlertBanner";

import Dashboard from "./pages/Dashboard";
import TelemetryPage from "./pages/TelemetryPage";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  const telemetryRef = useRef([]); // stores live telemetry session data

  //  Push a new alert
  const pushAlert = (message, type = "info") => {
    setAlerts((prev) => [...prev, { id: Date.now(), message, type }]);
  };

  // Remove an alert
  const removeAlert = (id) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  //  Download telemetry data (cached from telemetryRef)
  const handleDownload = async () => {
    try {
      const response = await fetch("http://localhost:8000/telemetry/history");
      const data = await response.json();
  
      if (!Array.isArray(data) || data.length === 0) {
        pushAlert("⚠️ No telemetry data available to download.", "warning");
        return;
      }
  
      // Convert JSON to CSV
      const csvHeaders = [
        "id",
        "timestamp",
        "temperature",
        "pressure",
        "altitude",
        "speed",
        "accel_x",
        "accel_y",
        "accel_z",
        "gyro_x",
        "gyro_y",
        "gyro_z",
      ];
  
      const csvRows = [csvHeaders.join(",")];
  
      data.forEach((entry) => {
        const row = [
          entry.id,
          entry.timestamp,
          entry.temperature,
          entry.pressure,
          entry.altitude,
          entry.speed,
          entry.accel?.x,
          entry.accel?.y,
          entry.accel?.z,
          entry.gyro?.x,
          entry.gyro?.y,
          entry.gyro?.z,
        ];
        csvRows.push(row.join(","));
      });
  
      const csvContent = csvRows.join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = `telemetry_data_${Date.now()}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  
      pushAlert("📥 Telemetry CSV downloaded!", "success");
    } catch (error) {
      console.error("Download error:", error);
      pushAlert("❌ CSV download failed. Check console.", "error");
    }
  };
  
  // Pause stream
  const handlePause = () => {
    setIsPaused(true);
    pushAlert("⏸️ Stream paused.", "warning");
  };

  // Resume stream
  const handleResume = () => {
    setIsPaused(false);
    pushAlert("▶️ Stream resumed.", "success");
  };

  // Clear and reload
  const handleClear = () => {
    pushAlert("🧹 Charts cleared. Reloading...", "warning");
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-slate-950 text-white">
        {/* 🚀 Fixed Header */}
        <DashboardHeader
          onToggleSidebar={() => setSidebarOpen(true)}
          missionStatus="online"
          isLive={!isPaused}
        />

        {/* 🔔 Alert Messages */}
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50">
          {alerts.map((alert) => (
            <AlertBanner
              key={alert.id}
              message={alert.message}
              type={alert.type}
              onClose={() => removeAlert(alert.id)}
            />
          ))}
        </div>

        {/* 📊 Main Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* 🧭 Sidebar */}
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            onDownload={handleDownload}
            onPause={handlePause}
            onResume={handleResume}
            onClear={handleClear}
          />

          {/* 📄 Page Content */}
          <main className="flex-1 overflow-y-auto p-4">
            <Routes>
              <Route
                path="/"
                element={<Dashboard isPaused={isPaused} telemetryRef={telemetryRef} />}
              />
              <Route
                path="/telemetry"
                element={<TelemetryPage isPaused={isPaused} telemetryRef={telemetryRef} />}
              />
            </Routes>
          </main>
        </div>

        {/* 📌 Footer */}
        <Footer />
      </div>
    </Router>
  );
}
export default App