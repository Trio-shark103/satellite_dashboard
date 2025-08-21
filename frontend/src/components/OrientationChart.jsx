import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Legend,
  Tooltip
);

function OrientationChart({ isPaused, telemetryRef }) {
  const [gyroData, setGyroData] = useState({
    gx: [],
    gy: [],
    gz: [],
    labels: [],
  });

  const maxPoints = 20;
  const counter = useRef(0);

  useEffect(() => {
    const fetchGyro = async () => {
      if (isPaused) return;

      try {
        const res = await fetch("http://localhost:8000/telemetry");
        const data = await res.json();
        console.log("Fetched gyro data:", data);

        if (!data.error && data.gyro) {
          const timeLabel = `T+${counter.current++}s`;

          setGyroData((prev) => ({
            gx: [...prev.gx.slice(-maxPoints + 1), data.gyro.x],
            gy: [...prev.gy.slice(-maxPoints + 1), data.gyro.y],
            gz: [...prev.gz.slice(-maxPoints + 1), data.gyro.z],
            labels: [...prev.labels.slice(-maxPoints + 1), timeLabel],
          }));

          // Save entire telemetry to shared ref (if needed for download)
          if (telemetryRef && telemetryRef.current) {
            telemetryRef.current.push(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch /telemetry:", err);
      }
    };

    const interval = setInterval(fetchGyro, 2000);
    return () => clearInterval(interval);
  }, [isPaused, telemetryRef]);

  const chartData = {
    labels: gyroData.labels,
    datasets: [
      {
        label: "Gyro X",
        data: gyroData.gx,
        borderColor: "#f43f5e",
        backgroundColor: "rgba(244, 63, 94, 0.1)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Gyro Y",
        data: gyroData.gy,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Gyro Z",
        data: gyroData.gz,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: "white" },
      },
    },
    scales: {
      x: {
        ticks: { color: "white" },
        grid: { color: "#334155" },
      },
      y: {
        ticks: { color: "white" },
        grid: { color: "#334155" },
      },
    },
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-800 rounded-2xl p-5 shadow-lg text-white w-full h-full flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-4 text-center">
        🧭 Orientation (Gyroscope)
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={gyroData.labels[gyroData.labels.length - 1]}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full h-[250px] md:h-[320px]"
        >
          <Line data={chartData} options={chartOptions} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default OrientationChart;