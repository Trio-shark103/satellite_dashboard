import React from "react";
import TelemetryTable from "../components/TelemetryTable";
import Footer from "../components/Footer";

function TelemetryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-white mb-4">📊 CubeSat Telemetry Table</h1>
        <TelemetryTable />
      </div>

      <Footer />
    </div>
  );
}

export default TelemetryPage;
