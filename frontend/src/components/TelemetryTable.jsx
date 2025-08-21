import React, { useEffect, useState, useRef } from "react";

function TelemetryTable() {
  const [rows, setRows] = useState([]);
  const counter = useRef(0);
  const maxRows = 100;

  useEffect(() => {
    const fetchTelemetry = async () => {
      try {
        const response = await fetch("http://localhost:8000/telemetry");
        const data = await response.json();

        if (!data.error) {
          const timestamp = new Date().toLocaleTimeString();
          const newRow = {
            id: counter.current++,
            timestamp,
            temp: data.temperature?.toFixed(2),
            pressure: data.pressure?.toFixed(2),
            altitude: data.altitude?.toFixed(2),
            ax: data.accel?.x?.toFixed(2),
            ay: data.accel?.y?.toFixed(2),
            az: data.accel?.z?.toFixed(2),
            gx: data.gyro?.x?.toFixed(2),
            gy: data.gyro?.y?.toFixed(2),
            gz: data.gyro?.z?.toFixed(2),
          };

          setRows((prev) => {
            const updated = [newRow, ...prev];
            return updated.slice(0, maxRows); // keep max 100 rows
          });
        }
      } catch (err) {
        console.error("Error fetching telemetry:", err);
      }
    };

    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-800 text-white rounded-lg overflow-auto shadow-lg">
      <table className="w-full text-sm text-left table-auto">
        <thead className="bg-slate-700 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Temp (°C)</th>
            <th className="px-4 py-2">Pressure (hPa)</th>
            <th className="px-4 py-2">Altitude (m)</th>
            <th className="px-4 py-2">Ax</th>
            <th className="px-4 py-2">Ay</th>
            <th className="px-4 py-2">Az</th>
            <th className="px-4 py-2">Gx</th>
            <th className="px-4 py-2">Gy</th>
            <th className="px-4 py-2">Gz</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {rows.map((row) => (
            <tr key={row.id} className="hover:bg-slate-700 transition">
              <td className="px-4 py-2">{row.timestamp}</td>
              <td className="px-4 py-2">{row.temp}</td>
              <td className="px-4 py-2">{row.pressure}</td>
              <td className="px-4 py-2">{row.altitude}</td>
              <td className="px-4 py-2">{row.ax}</td>
              <td className="px-4 py-2">{row.ay}</td>
              <td className="px-4 py-2">{row.az}</td>
              <td className="px-4 py-2">{row.gx}</td>
              <td className="px-4 py-2">{row.gy}</td>
              <td className="px-4 py-2">{row.gz}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TelemetryTable;
