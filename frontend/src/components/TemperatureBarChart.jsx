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

function TemperatureBarChart() {
  const [data, setData] = useState([]);

  // Simulated Temperature data every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      const temperature = Math.floor(Math.random() * 1000) + 500; // Simulated 500–1500m
      setData((prevData) => {
        const updated = [...prevData, { time: timestamp, temperature }];
        return updated.slice(-10); // Keep last 10 data points
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 p-5 rounded-2xl shadow-xl h-full flex flex-col">
      <h2 className="text-xl font-semibold text-white text-center mb-4">
        🌡️ Temperature Change Over Time
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" unit="°C" />
          <Tooltip
            wrapperClassName="text-black"
            labelStyle={{ color: "#333" }}
            formatter={(value) => [`${value} °C`, "Temperature"]}
          />
          <Bar dataKey="temperature" fill="#00bcd4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default TemperatureBarChart;