import React, { useEffect, useState } from "react";
import { MdMenu } from "react-icons/md";

function DashboardHeader({ onToggleSidebar, missionStatus = "online", isLive = true }) {
  const [time, setTime] = useState(new Date().toLocaleString());
  const statusColor = missionStatus === "online" ? "bg-green-500" : "bg-red-600";
  const statusText = missionStatus === "online" ? "🟢 Online" : "🔴 Offline";

  const liveColor = isLive ? "bg-orange-400" : "bg-gray-500";
  const liveText = isLive ? "🟠 Live" : "⏸️ Paused";


  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-slate-800 text-white px-6 py-4 rounded-2xl shadow-md mb-6 flex justify-between items-center">
      <div className="flex items-center gap-4">
        {/* Sidebar toggle (mobile only) */}
        <button
          className="md:hidden text-2xl hover:text-sky-400"
          onClick={onToggleSidebar}
        >
          <MdMenu />
        </button>

        <h1 className="text-2xl font-bold tracking-wide">🛰️ CubeSat Dashboard</h1>
      </div>

      <div className="text-sm font-mono text-sky-200">{time}</div>
      <div className="flex items-center gap-3 text-sm">
        {/* Mission Status */}
        <span className={`px-3 py-1 rounded-full font-medium ${statusColor}`}>
          {statusText}
        </span>

        {/* Live/Paused Status */}
        <span className={`px-3 py-1 rounded-full font-medium ${liveColor}`}>
          {liveText}
        </span>
      </div>
    </header>
  );
}
export default DashboardHeader;