import React, { useEffect, useState } from "react";

function AtmosphericGauge() {
  const [pressure, setPressure] = useState(0);
  const [altitude, setAltitude] = useState(0);

  useEffect(() => {
    const fetchAtmosphere = async () => {
      try {
        const response = await fetch("http://localhost:8000/telemetry");
        const data = await response.json();
        if (!data.error) {
          setPressure(data.pressure);
          setAltitude(data.altitude);
        }
      } catch (err) {
        console.error("Error fetching atmospheric data:", err);
      }
    };

    fetchAtmosphere(); // Initial
    const interval = setInterval(fetchAtmosphere, 2000); // every 2s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-sky-800 to-blue-900 rounded-2xl p-5 shadow-lg text-white w-full h-full">
      <h2 className="text-xl font-semibold mb-4 text-center">Atmospheric Gauge</h2>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="bg-slate-800 p-4 rounded-xl shadow-inner">
          <h3 className="text-sm text-slate-400">Pressure</h3>
          <p className="text-3xl font-bold text-cyan-300">{pressure.toFixed(2)}</p>
          <span className="text-xs text-slate-400">hPa</span>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl shadow-inner">
          <h3 className="text-sm text-slate-400">Altitude</h3>
          <p className="text-3xl font-bold text-cyan-300">{altitude.toFixed(2)}</p>
          <span className="text-xs text-slate-400">meters</span>
        </div>
      </div>
    </div>
  );
}
export default AtmosphericGauge;