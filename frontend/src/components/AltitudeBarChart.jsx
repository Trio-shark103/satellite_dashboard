import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

function AltitudeBarChart() {
  const [data, setData] = useState([]);

  // Simulated altitude data every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const altitude = Math.floor(Math.random() * 1000) + 500; // Simulated 500–1500m
      setData((prevData) => {
        const updated = [...prevData, { time: timestamp, altitude }];
        return updated.slice(-10); // Keep last 10 data points
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 p-5 rounded-2xl shadow-xl h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        🛰️ Altitude Over Time
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" unit=" m" />
          <Tooltip
            wrapperClassName="text-black"
            labelStyle={{ color: "#333" }}
            formatter={(value) => [`${value} m`, "Altitude"]}
          />
          <Bar dataKey="altitude" fill="#00bcd4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default AltitudeBarChart;