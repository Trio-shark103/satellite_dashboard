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

function AccelerationChart() {
  const [accelData, setAccelData] = useState({
    ax: [],
    ay: [],
    az: [],
    labels: [],
  });

  const maxPoints = 20;
  const counter = useRef(0);

  useEffect(() => {
    const fetchAccel = async () => {
      try {
        const response = await fetch("http://localhost:8000/telemetry");
        const data = await response.json();

        if (!data.error && data.accel) {
          const timeLabel = `T+${counter.current++}s`;

          setAccelData((prev) => ({
            ax: [...prev.ax.slice(-maxPoints + 1), data.accel.x],
            ay: [...prev.ay.slice(-maxPoints + 1), data.accel.y],
            az: [...prev.az.slice(-maxPoints + 1), data.accel.z],
            labels: [...prev.labels.slice(-maxPoints + 1), timeLabel],
          }));
        }
      } catch (err) {
        console.error("Error fetching acceleration data:", err);
      }
    };

    fetchAccel();
    const interval = setInterval(fetchAccel, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: accelData.labels,
    datasets: [
      {
        label: "Accel X",
        data: accelData.ax,
        borderColor: "#fb923c",
        backgroundColor: "rgba(251, 146, 60, 0.1)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Accel Y",
        data: accelData.ay,
        borderColor: "#10b981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Accel Z",
        data: accelData.az,
        borderColor: "#6366f1",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
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
        labels: {
          color: "white",
          font: { size: 12 },
        },
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
    <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-5 shadow-lg text-white w-full h-full flex flex-col justify-between">
      <h2 className="text-xl font-semibold mb-4 text-center">
        🧪 Acceleration (Accelerometer)
      </h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={accelData.labels[accelData.labels.length - 1]}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="w-full h-[250px] md:h-[320px]" // ✅ Responsive height
        >
          <Line data={chartData} options={chartOptions} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
export default AccelerationChart;
